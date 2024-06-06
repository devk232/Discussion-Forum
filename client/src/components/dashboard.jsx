import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./listgroup";
import Posts from "./posts";
import { paginate } from "../utils/paginate";
import { api } from "../config.js";
import http from "../services/httpService";
import Jumotron from "./common/jumbotron";

class Dashboard extends Component {
  state = {
    allPosts: [],
    currentPage: 1,
    pageSize: 4,
    tags: [],
    selectedTag: { _id: "1", name: "All Posts" },
  };

  async componentDidMount() {
    const { data: allPosts } = await http.get(api.postsEndPoint);
    const { data: tags } = await http.get(api.tagsEndPoint);

    this.setState({
      allPosts: allPosts.filter((post) => post !== null),
      tags: [
        {
          _id: "1",
          name: "All Posts",
        },
        ...tags,
      ],
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePostDelete = async (postId) => {
    await http.delete(`${api.postsEndPoint}/${postId}`);
    const { data: allPosts } = await http.get(api.postsEndPoint);
    this.setState({ allPosts: allPosts.filter((post) => post !== null) });
  };

  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 });
  };

  getFilteredPosts() {
    const { allPosts, selectedTag } = this.state;
    return selectedTag._id === "1" ? allPosts : allPosts.filter(post => post.tags.some(tag => tag.name === selectedTag.name));
  }

  render() {
    const { user } = this.props;
    const { allPosts, pageSize, currentPage, tags, selectedTag } = this.state;
    const filteredPosts = this.getFilteredPosts();
    const paginatedPosts = paginate(filteredPosts, currentPage, pageSize);

    return (
      <React.Fragment>
        <Jumotron />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-flex w-100 justify-content-between m-3">
                Showing {filteredPosts.length} posts.
                {user && (
                  <Link to="/new-post">
                    <button className="btn btn-success">New Post</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <Posts posts={paginatedPosts} onDelete={this.handlePostDelete} />
            </div>
            <div className="col-3">
              <ListGroup
                items={tags}
                selectedTag={selectedTag}
                onTagSelect={this.handleTagSelect}
              />
            </div>
          </div>
          <Pagination
            itemCount={filteredPosts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
