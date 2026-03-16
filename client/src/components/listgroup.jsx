import React from "react";

const ListGroup = ({ items, selectedTag, onTagSelect }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            item === selectedTag ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onTagSelect(item)}
        >
          {item.name}
          {item.tags && (
            <ul className="list-group mt-2">
              {item.tags.map((tag) => (
                <li key={tag} className="list-group-item">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
