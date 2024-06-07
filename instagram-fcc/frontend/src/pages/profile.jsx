

import { useEffect, useState } from "react";
import usePhotos from "../hooks/use-photos";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { togglePrivacy, togglePrivacyAsync } from "../state/profile-privacy/profilePrivacySlice";
import {
  getMovieDetailAsync,
} from "../state/getMovieDetail/getMovieDetailSlice";


function Profile() {
  const dispatch = useDispatch();
  const privacyState = useSelector((state) => state.profilePrivacy.privacy);

  const movieDetailState = useSelector((state) => state.movieDetail.movieDetail);
  const [file, setFile] = useState(null);
  const { user } = GlobalDataState();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()
  
  const { myPhotos } = usePhotos();

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[])
  console.log("privacy sate", privacyState);
  console.log("movie detail satte", movieDetailState);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handlePhotoPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.ACCESS_TOKEN}`,
          "content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8001/api/v1/photos/insert-photos",
        {
          imageSrc: file,
        },
        config
      );
     alert("photo uploaded successfully")
     setToggle(false);
    } catch (err) {
      console.log("failed to upload photos", err);
    }
  };
  const url_imgs = "http://localhost:8001/images/"
  console.log(myPhotos);
  return (
    <>
      <p>Privacy: {privacyState}</p>
      <button
        onClick={() => {
          console.log("here");
          return dispatch(togglePrivacy());
        }}
      >
        toggle
      </button>
      <button onClick={() => dispatch(togglePrivacyAsync())}>
        toggle async
      </button>
      <button onClick={() => dispatch(getMovieDetailAsync())}>
        get movie detail async
      </button>
      <button
        onClick={() => setToggle(!toggle)}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Post
      </button>
      <hr className="bg-gray-500" />
      {toggle && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a new post
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div>
                  <img className="w-25" src="/imges/gallery.png" alt="" />
                </div>
                <div>
                  <p className="text-lg">Drag photos and videos here</p>
                </div>
                <div>
                  <div>
                    <label htmlFor="files" className="bg-blue">
                      Select from this computer
                    </label>

                    <input
                      id="files"
                      onChange={handleFileChange}
                      name="imageSrc"
                      type="file"
                      className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    />
                    <button
                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={handlePhotoPost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
  // return (
  //   <div>
  //     {" "}
  //     <div className="px-2 py-1 flex md:hidden flex-row justify-between">
  //       <div className="flex max-w-20.">
  //         <img src="/imges/logo.png" alt="instagram logo" />
  //         <span className="flex justify-center items-center ml-1 align-baseline">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             className="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="m19.5 8.25-7.5 7.5-7.5-7.5"
  //             />
  //           </svg>
  //         </span>
  //       </div>

  //       <div className="flex px-2">
  //         <span className="flex justify-center items-center mx-1">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             className="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  //             />
  //           </svg>
  //         </span>
  //         <span className="flex justify-center items-center">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             className="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
  //             />
  //           </svg>
  //         </span>
  //       </div>
  //     </div>
  //     <div className=" hidden sm:flex flex-col">
  //       <div className="my-3">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
  //           />
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
  //           />
  //         </svg>
  //       </div>
  //       <div className="flex flex-col gap-5 ">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
  //           />
  //         </svg>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  //           />
  //         </svg>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
  //           />
  //         </svg>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  //           />
  //         </svg>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
  //           />
  //         </svg>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="w-6 h-6"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
  //           />
  //         </svg>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Profile;
