import { GlobalDataState } from "../../context/GlobalDataProvider";
import NotificationListItem from "./notification-list-item";

function NotificationModal({ showModal, modalId, handleClick }) {
  const { user, setUser, notification } = GlobalDataState() || {};
  console.log("modal", notification);
  const notificationInfoList = notification.map((item) => {
    return <NotificationListItem item={item}></NotificationListItem>;
  });
  return (
    <div

      id="static-modal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      className="absolute top-2 left-neg-20 w-52 z-50 "
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <ul className="border border-2 border-black ">{notificationInfoList}</ul>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
