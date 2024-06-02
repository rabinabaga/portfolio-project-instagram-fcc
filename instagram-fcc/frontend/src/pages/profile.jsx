import { useEffect, useState, useRef } from "react";
import usePhotos from "../hooks/use-photos";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/upload-image";
import ProfileHeader from "../components/profile/header";
import Header from "../components/header"

function Profile() {
  const { user } = GlobalDataState();
  console.log(user);
  const navigate = useNavigate();
  const url_imgs = "http://localhost:8001/images/";

  const { myPhotos, setMyPhotos } = usePhotos();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);   

  return (
    <>
      <UploadImage setMyPhotos={setMyPhotos}></UploadImage>
      <Header></Header>
      <ProfileHeader username={user?.username}></ProfileHeader>
      <div className="max-w-screen-lg mx-auto grid px-28 grid-cols-3 grid-rows-2 gap-4">
        {myPhotos?.map((photo) => {
          return (
            <div key={photo._id}>
              <img
                className="h-72 w-72 object-cover "
                src={`${url_imgs}${photo.imageSrc}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Profile;
