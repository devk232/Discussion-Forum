import React from "react";
import { Link, useHistory } from "react-router-dom";
import ThreeDotMenu from "./common/ThreeDotMenu";

const Posts = ({ posts, onDelete }) => {
  const history = useHistory();

  const handleEdit = (postId) => {
    history.push(`/edit-post/${postId}`);
  };

  const handleDelete = (postId) => {
    onDelete(postId);
  };

  return (
    <div className="list-group">
      {posts.map((post) => (
        <div key={post._id} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <Link to={`/post/${post._id}`}>
              <h5 className="mb-1">{post.title}</h5>
            </Link>
            <ThreeDotMenu
              onEdit={() => handleEdit(post._id)}
              onDelete={() => handleDelete(post._id)}
            />
          </div>
          <small>Created by {post.author ? post.author : "Unknown author"}</small>
          <br />
          <small className="overflow-hidden">{post.description}</small>
          <div className="mt-1">
            Related Topics:
            {post.tags &&
              post.tags.map((tag) => (
                <span key={tag._id} className="badge badge-secondary m-1 p-2">
                  {tag.name}
                </span>
              ))}
            <h6 className="mt-2">
              {post.upvotes ? post.upvotes.length : 0} Likes | {post.views} Views
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
