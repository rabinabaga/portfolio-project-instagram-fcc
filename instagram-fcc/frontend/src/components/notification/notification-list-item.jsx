import { useState } from "react";
import PostModal from "./post-modal";

function NotificationListItem({ item }) {
 
  const [showPostModal, setShowPostModal] = useState(false);
  const likes = item?.likes;
  const url_imgs = "http://localhost:8001/images/";
   console.log("show post modal", showPostModal);
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
  {showPostModal && <PostModal showPostModal={showPostModal} content={item} handleClick={handleClick} />}
  </>;
}

export default NotificationListItem;
