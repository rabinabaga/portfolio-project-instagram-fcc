import { useState } from "react";

function NotificationListItem({ item }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const likes = item?.likes;
  const url_imgs = "http://localhost:8001/images/";
  const mappedLikes = likes.map((like) => {
    return (
      <div onClick={showPostModal}>
        <span>{like.username} likes your photo</span>
        <img src={`${url_imgs}${item.imageSrc}`} alt="" className="w-8 h-8 " />
      </div>
    );
  });

  return <>{mappedLikes}
  {showPostModal && <PostModal />}
  </>;
}

export default NotificationListItem;
