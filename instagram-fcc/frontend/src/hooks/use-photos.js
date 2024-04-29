import { useEffect } from "react";
import { getPhotos } from "../services/firebase";
import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";
import { GlobalDataState } from "../context/GlobalDataProvider";

export default function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const { user } = GlobalDataState();

  useEffect(() => {
    async function getTimelinePhotos() {
      const following = user?.following;
      let followedUserPhotos = [];

      //does the user acutally follow people
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(user?._id, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    getTimelinePhotos();
  }, [user?.uid]);

  return { photos };
}
