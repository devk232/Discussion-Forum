import React from "react";

const Posts = (props) => {
  const { posts, onDelete } = props;
  return (
    <div className="list-group">
      {posts.map((post) => (
        
        <a className="list-group-item list-group-item-action flex-column align-items-start" href='/posts/'>
          <div className="d-flex w-100 justify-content-between" key={post._id}>
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
          <small>Created by {post.author.name}</small>
          <br />
          <small className="overflow-hidden">{post.description}</small>
          <div className="mt-1">
            Related Topics:
            {post.tags.map((tag) => (
              <span className="badge badge-secondary m-1 p-2">{tag.name}</span>
            ))}
            <h6 className="mt-2">
              {post.upvotes.length} Likes | {post.views} Views
            </h6>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Posts;
