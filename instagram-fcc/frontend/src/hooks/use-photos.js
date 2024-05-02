import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { GlobalDataState } from "../context/GlobalDataProvider";

export default function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const { user } = GlobalDataState();

  useEffect(() => {
    async function getTimelinePhotos() {
      const following = user?.following;
      let followedUserPhotos;

      async function getPhotos() {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };

          //its implied, the jwt token has the id of the loggedin user and we need the following poeple's photos, and this api is for that exactly
          followedUserPhotos = await axios.get(
            "http://localhost:8001/api/v1/photos/get-photos",

            config
          );
          const data = followedUserPhotos.data.data;
          setPhotos(data);
        } catch (error) {
          console.log("error", error);
        }
      }
      //does the user acutally follow people
      if (following?.length > 0) {
        followedUserPhotos = await getPhotos();
      }

      // followedUserPhotos.sort((a, b) => b.createdAt - a.createdAt);
    }
    getTimelinePhotos();
  }, [user]);

  return { photos };
}
