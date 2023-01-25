import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";
import { PersonCircle, HandThumbsUpFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import http from "../services/httpService";
import { api } from "../config.js";
import PostReply from "./createReply";

class PostPage extends Component {
  state = {
    post: {
      description: "",
      title: "",
      tags: [],
      author: [],
      upvotes: [],
      views: 0,
    },
    replies: [],
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data: post } = await http.get(api.postsEndPoint + id);
    const { data: replies } = await http.get(api.repliesEndPoint  + id);
    this.setState({ post: post, replies: replies });
  }
  checkLike() {
    const { user } = this.props;
    const { post } = this.state;
    //console.log(user);
    if (user && post.upvotes && post.upvotes.includes(user._id)) return true;
    else return false;
  }
  checkReplyLike(id) {
    const { replies } = this.state;
    const { user } = this.props;
    if (user) {
      for (let i in replies) {
        if (replies[i]._id === id) {
          if (replies[i].upvotes.includes(user._id)) return true;
        }
      }
    }
    return false;
  }
  handleUpvote = async () => {
    try {
      const { data: post } = await http.put(
        api.postEndPoint + "like/" + this.props.match.params.id,
        {}
      );
      console.log(post);
      this.setState({ post: post[0] });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("You can't upvote your own post!");
      }
    }
  };
  handleReplyUpvote = async (id) => {
    try {
      const replies_old = [...this.state.replies];
      const reply_updated = await http.put(api.repliesEndPoint + "like/" + id, {});
      const { data: replies } = await http.get(
        api.repliesEndPoint + "/" + this.props.match.params.id
      );
      console.log(replies);
      this.setState({ replies: replies });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("You can't upvote your own reply!");
      }
    }
  };
  render() {
    const { post, replies } = this.state;
    const { user } = this.props;
    return (
      <div>
        <ToastContainer />
        <div className="container col-lg-6 shadow-lg p-3 mt-5 bg-body rounded">
          <h2>{post.title}</h2>
          <p className="mt-4" style={{ color: "#505050" }}>
            {post.description}
          </p>
          <div className="mt-1">
            Related Topics:
            {post.tags &&
              post.tags.map((tag) => (
                <span className="badge badge-success m-1 p-2">{tag.name}</span>
              ))}
            <div className="d-flex w-100 justify-content-between mt-3 mb-3">
              <button
                disabled={!user}
                className={
                  this.checkLike()
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
                }
                onClick={this.handleUpvote}
              >
                <HandThumbsUpFill className="mr-2" />
                {(post.upvotes && post.upvotes.length) || 0}
              </button>
              <p>{post.views} Views</p>
            </div>
            <div
              class="d-flex w-100 justify-content-between"
              style={{ color: "#505050" }}
            >
              <div>
                <PersonCircle size={30} className="mr-2" />
                Posted by {(post.author && post.author.username) || 0}
              </div>
              <p class="mb-1">
                <Moment fromNow>{post.time}</Moment>
              </p>
            </div>
          </div>
        </div>
        {user && <PostReply id={this.props.match.params.id} />}
        <div className="container col-lg-6 shadow-lg p-3 mt-5 bg-body rounded">
          Showing {replies.length} replies
        </div>
        <div>
          {replies &&
            replies.map((reply) => (
              <div className="container col-lg-6 shadow-lg p-3 mt-3 bg-body rounded">
                <div className="ml-4">
                  <PersonCircle size={30} className="mr-3" />
                  Posted by {reply.author.username}
                </div>
                <div className="m-4">{reply.comment}</div>
                <div className="d-flex w-100 justify-content-between mt-3 mb-3">
                  <button
                    className={
                      this.checkReplyLike(reply._id)
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    disabled={!user}
                    onClick={() => {
                      this.handleReplyUpvote(reply._id);
                    }}
                  >
                    <HandThumbsUpFill className="mr-2" />
                    {reply.upvotes.length}
                  </button>
                  <p class="mb-1">
                    <Moment fromNow style={{ color: "#505050" }}>
                      {reply.time}
                    </Moment>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default PostPage;
