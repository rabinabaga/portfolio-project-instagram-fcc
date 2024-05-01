import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import { useRef } from "react";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      
      <Header username={content.username}></Header>
      <Image src={content.imageSrc} caption={content.caption}></Image>
      <Actions
        docId={content._id}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      ></Actions>
      <Footer username={content.username} caption={content.caption}></Footer>
      <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput}></Comments>
    </div>
  );
}

// Post.propTypes = {
//   content: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     imageSrc: PropTypes.string.isRequired,
//     caption: PropTypes.string.isRequired,
//     docId: PropTypes.string.isRequired,
//     userLikedPhoto: PropTypes.bool.isRequired,
//     likes: PropTypes.array.isRequired,
//     comments: PropTypes.array.isRequired,
//     dateCreated: PropTypes.number.isRequired,
//   }),
// };
