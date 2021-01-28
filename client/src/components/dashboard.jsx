import React, { Component } from "react";
import axios from "axios";
import Pagination from "./common/pagination";
import ListGroup from "./listgroup";
import { Link } from "react-router-dom";
import Posts from "./posts";
import { paginate } from "../utils/paginate";

class Dashboard extends Component {
  state = {
    allposts: [],
    currentPage: 1,
    pageSize: 20,
    tags: [
      { _id: 1, value: "All Tags" },
      { _id: 2, value: "faltu" },
      { _id: 3, value: "hello" },
      { _id: 4, value: "curiosity" },
      { _id: 5, value: "me" },
    ],
    selectedTag: { value: "All Tags" },
  };
  async componentDidMount() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(data);
    this.setState({ allposts: data });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handlePostDelete = (post) => {};
  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 });
  };
  render() {
    const {
      allposts,
      pageSize,
      currentPage,
      tags,
      selectedTag,
    } = this.state;
    const filtered =
      selectedTag.value !== "All Tags"
        ? allposts.filter((post) => post.tags.includes(selectedTag.value))
        : allposts;
    const posts = paginate(filtered, currentPage, pageSize);
    if (allposts.length === 0)
      return <p>There are no posts in the database!</p>;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-flex w-100 justify-content-between m-3">
                Showing {filtered.length} posts.
                <a href="/new-post">
                  <button type="button" class="btn btn-success">
                    Create New Discussion
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <Posts posts={posts} onDelete={this.handlePostDelete} />
            </div>
            <div className="col-3">
              <ListGroup
                items={tags}
                selectedTag={this.state.selectedTag}
                onTagSelect={this.handleTagSelect}
              />
            </div>
            <Pagination
              itemCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
