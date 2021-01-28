import React from "react";

const Posts = (props) => {
  const { posts, onDelete } = props;
  return (
    <div className="list-group">
      {posts.map((post) => (
        <a className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{post.title}</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onClick={() => onDelete(post)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <small>Created by {post.userId}</small>
          <br /> href="http://www.google.com"
          <small className="overflow-hidden">{post.body}</small>
          <div>
            Related Topics:
            {/* {post.tags.map((tag) => (
              <span className="badge badge-secondary m-1 p-2">{tag}</span>
            ))} */}
            <h6 className="mt-2">
              {post.id} Likes | {post.id} Views
            </h6>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Posts;
