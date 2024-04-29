// import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";
import { GlobalDataState } from "../../context/GlobalDataProvider";

export default function Sidebar() {
  // const {user: { fullName, username, userId }} = useUser();
  const { user } = GlobalDataState();

  return (
    <div className="p-4">
      <User username={user?.username} fullName={user?.fullName} pic={user?.pic}/>
      <Suggestions following={user?.following} loggedInUserDocId={user?.docId} />
    </div>
  );
}
// spDocId, username, profileId, userId, loggedInUserDocId