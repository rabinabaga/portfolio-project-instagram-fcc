import { PropTypes } from "prop-types";
import { useContext, useEffect } from "react";
import { useState } from "react";

import { GlobalDataState } from "../../context/GlobalDataProvider";
import axios from "axios";
import { useSocket } from "../../context/socket";

export default function Actions({
  docId,
  likedPhoto,
  handleFocus,
  totalLikes,
}) {
  const socket = useSocket();

  const [toggleLiked, setToggleLiked] = useState(likedPhoto);

  const [likes, setLikes] = useState(totalLikes);

  const { user } = GlobalDataState();
  console.log("user in actions", user);

  const handleToggleLiked = async () => {
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));

    setToggleLiked((toggleLiked) => !toggleLiked);
    async function updatePhoto() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };


        const { data } = await axios.post(
          "http://localhost:8001/api/v1/photos/update-photo",
          {
            docId,
            username: user.username,
            toggleUser: toggleLiked ? false : true,
          },
          config
        );
        console.log("data in update photo", data);
         if (socket) {
          console.log("socket present in actions");
          socket.emit("userLikedPhoto", {
            message: "a photo has been liked by this user",
            userId: user._id,
            socketID: socket.id,
            photoUserId: "662fdcacd6883005eaeaf6df",
          });
         }
      } catch (err) {
        console.log("error in update photo", err);
      }
    }
    updatePhoto();
   
  }

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        console.log("received notification", data);
      });

      return () => {
        if (socket) {
          socket.off("notification"); // Unsubscribe from specific event
        }
      };
    }
  }, [socket]);




  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={`w-6 h-6 mr-4 select-none cursor-pointer ${toggleLiked ? "fill-red text-red-primary" : "text-black-light"
              }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <svg
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6  mr-4 select-none cursor-pointer "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );

}

// Actions.propTypes = {
//   docId: PropTypes.string.isRequired,
//   likedPhoto: PropTypes.bool.isRequired,
//   //   handleFocus: PropTypes.func.isRequired,
//   totalLikes: PropTypes.number.isRequired,
// };
