import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalDataState } from "../context/GlobalDataProvider";
import { Badge, Button } from "@material-tailwind/react";

import * as ROUTES from "../constants/routes";
import NotificationModal from "./notification/notification-modal";

export default function Header() {
  const { user, setUser, notification } = GlobalDataState() || {};
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const navigate = useNavigate();
  const modalId = "static-modal";
  console.log("notification", notification);
  const handleClick = () => {
    setShowNotificationModal(!showNotificationModal);
  };
  console.log("show", showNotificationModal);
  const handleSendMessage = (e) => {
    e.preventDefault();
    // socket.emit('message', {
    //   text: "message",
    //   id: `${socket.id}${Math.random()}`,
    //   socketID: socket.id,
    // });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/imges/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <div className="relative">
                  <Badge
                    className={`p-1 ${
                      notification.length > 0 ? "1" : "hidden"
                    } `}
                  >
                    <button
                      onClick={handleClick}
                      data-modal-target={modalId}
                      data-modal-toggle="static-modal"
                      className="w-12 pt-1 block "
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-8 h-8"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                  </Badge>
                  {showNotificationModal && (
                    <NotificationModal
                      modalId={modalId}
                      showModal={showNotificationModal}
                      handleClick={handleClick}
                    ></NotificationModal>
                  )}
                </div>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    navigate(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      localStorage.removeItem("userInfo");

                      navigate(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                {user && (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user?.username}`}>
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src={`/imges/avatars/${user?.username}.jpg`}
                        alt={`${user?.username} profile`}
                        // onError={(e) => {
                        //   e.target.src = DEFAULT_IMAGE_PATH;
                        // }}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
//
