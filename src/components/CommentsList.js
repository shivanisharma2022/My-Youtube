import React from "react";
import Comment from "./Comment";

const CommentsList = ({ comments }) => {
  // Don't use indexes as keys
  // recursive component, which calls itself to render the comments list
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

export default CommentsList;
