import { useState } from "react";
import usePhotos from "../hooks/use-photos";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
function UploadImage() {
  const { user } = GlobalDataState();
 

  const { myPhotos } = usePhotos();
  const [file, setFile] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handlePhotoPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user[ACCESS_TOKEN]}`,
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
      alert("photo uploaded successfully");
      setToggle(false);
    } catch (err) {
      console.log("failed to upload photos", err);
    }
  };
  console.log(myPhotos);
  return (
    <>
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
    </>
  );
}

export default UploadImage;
