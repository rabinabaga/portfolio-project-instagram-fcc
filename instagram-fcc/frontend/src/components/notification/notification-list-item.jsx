import { useState } from "react";
import PostModal from "./post-modal";

function NotificationListItem({ item }) {
  console.log("nli", item);
  const [showPostModal, setShowPostModal] = useState(false);
  const likes = item?.likes;
  const url_imgs = "http://localhost:8001/images/";
  const handleClick = ()=>{
    setShowPostModal(true)
  }
  const mappedLikes = likes.map((like) => {
    return (
      <li key={item._id} onClick={handleClick}>
        <span>{like.username} likes your photo</span>
        <img src={`${url_imgs}${item.imageSrc}`} alt="" className="w-8 h-8 " />
      </li>
    );
  });

  return <>{mappedLikes}
  {showPostModal && <PostModal content={item} handleClick={handleClick} showPostModal={showPostModal} />}
  </>;
}

export default NotificationListItem;
