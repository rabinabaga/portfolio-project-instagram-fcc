import { useEffect, useState, useRef } from "react";
import usePhotos from "../hooks/use-photos";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/upload-image";



function Profile() {
  const { user } = GlobalDataState();
  const navigate = useNavigate();
  const url_imgs = "http://localhost:8001/images/";

  const { myPhotos } = usePhotos();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  
  return (
    <>
     
      <UploadImage></UploadImage>
      <div className="grid px-28 grid-cols-4 grid-rows-2 gap-4">
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
