import PropTypes from "prop-types";
import { useState, useContext } from "react";
import UserContext from "../../context/user";

import FirebaseContext from "../../context/firebase";
import useUser from "../../hooks/use-user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { user } = useUser();
  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComments([{ displayName: user?.username, comment }, ...comments]);
    setComment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          comment,
          displayName: user?.username,
        }),
      });
  };
  return (
    <div>
      {user?.displayName}
      <form
        className="border-t border-gray-primary flex justify-between pr-5 mt-2"
        action=""
        onSubmit={(event) =>
          `${
            comment.length >= 1 ? handleSubmitComment : event.preventDefault()
          }`
        }
      >
        <input
          type="text"
          ref={commentInput}
          placeholder="Add a comment"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          name="add-comment"
          value={comment}
          onChange={({ target }) => {
            setComment(target.value);
          }}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={(event) => handleSubmitComment(event)}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
