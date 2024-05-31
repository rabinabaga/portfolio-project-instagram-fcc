import { useState, useRef } from "react";
import usePhotos from "../hooks/use-photos";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import { ACCESS_TOKEN } from "../constants";
import { canvasPreview } from "./helpers/canvasPreview";
import { useDebounceEffect } from "./helpers/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function UploadImage() {
  const { user } = GlobalDataState();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(1 / 1);

  const { myPhotos } = usePhotos();
  const [toggle, setToggle] = useState(false);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  const handlePhotoPost = async () => {
    const canvas = previewCanvasRef.current;

    canvas.toBlob(async (blob) => {
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
            imageSrc: blob,
          },
          config
        );
        alert("photo uploaded successfully");
        setToggle(false);
      } catch (err) {
        console.log("failed to upload photos", err);
      }
    });
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
                  <div>
                    <label htmlFor="files" className="bg-blue">
                      Select from this computer
                    </label>

                    <div className="Crop-Controls">
                      <input
                        id="files"
                        onChange={onSelectFile}
                        name="imageSrc"
                        type="file"
                        accept="image/*"
                        className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      />
                    </div>
                    {!!imgSrc && (
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        // minWidth={400}
                        minHeight={100}
                        // circularCrop
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={imgSrc}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    )}
                    {!!completedCrop && (
                      <>
                        <div>
                          <canvas
                            ref={previewCanvasRef}
                            style={{
                              border: "1px solid black",
                              objectFit: "contain",
                              width: completedCrop.width,
                              height: completedCrop.height,
                            }}
                          />
                        </div>
                      </>
                    )}

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