import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  //display comment and then, add comment
  const [comments, setComments] = useState(allComments);

  return (
    <>
      {comments.length >= 2 && (
        <p className="text-sm text-gray-base p-4 pt-2 pb-0  cursor-pointer">
          View all {comments.length} comments
        </p>
      )}
      {comments?.slice(0, 3).map((item) => {
        return (
          <p
            key={`${item.comment}-${item.displayName}`}
            className="p-4 pt-2 pb-0"
          >
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        );
      })}
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      ></AddComment>
      <p className="text-gray-base uppercase text-xs p-4 pt-2 pb-0 mt-2 mb-4">
        {formatDistance(posted, new Date())} ago
      </p>
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
