import React from "react";

const BlogPost = ({ blog }) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <small>Tags: {blog.tags}</small>
    </div>
  );
};

export default BlogPost;
