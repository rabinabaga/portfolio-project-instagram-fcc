import { useEffect } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

import { useState } from "react";
import { GlobalDataState } from "../context/GlobalDataProvider";
import { useNavigate } from "react-router-dom";

export default function usePhotos() {
  const [photos, setPhotos] = useState([]);

  const [myPhotos, setMyPhotos] = useState([]);
  const { user } = GlobalDataState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTimelinePhotos() {
      const following = user?.following;
      let followedUserPhotos;

      async function getPhotos() {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user[ACCESS_TOKEN]}`,
            },
          };

          //its implied, the jwt token has the id of the loggedin user and we need the following poeple's photos, and this api is for that exactly
          followedUserPhotos = await axios.get(
            " http://localhost:8001/api/v1/photos/get-photos",

            config
          );

          const { status } = followedUserPhotos;
          console.log("status", status);
          if (status === 401) {
            navigate("/login");
          }
          console.log("followed user photos", followedUserPhotos);
          const data = followedUserPhotos.data.data;
          setPhotos(data);
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("userInfo");
            navigate("/login");
          }
        }
      }
      //does the user acutally follow people
      if (following?.length > 0) {
        followedUserPhotos = await getPhotos();
      }

      // followedUserPhotos.sort((a, b) => b.createdAt - a.createdAt);
    }


    
    async function getProfilePhotos() {
      let myFetchedPhotos;
      async function getMyPhotos() {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user[ACCESS_TOKEN]}`,
            },
          };

          //its implied, the jwt token has the id of the loggedin user and we need the following poeple's photos, and this api is for that exactly
          myFetchedPhotos = await axios.get(
            "http://localhost:8001/api/v1/photos/get-my-photos",
            config
          );
          const data = myFetchedPhotos?.data?.data;
          setMyPhotos(data);
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("userInfo");
            navigate("/login");
          }
        }
      }
      //does the user acutally follow people
      if (user) {
        myFetchedPhotos = await getMyPhotos();
      }

      // followedUserPhotos.sort((a, b) => b.createdAt - a.createdAt);
    }
    getTimelinePhotos();
    getProfilePhotos();
  }, [user]);

  return { photos, myPhotos };
}
