import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GlobalDataState } from "../../context/GlobalDataProvider";
import axios from "axios";
// import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from "../../services/firebase";
import {ACCESS_TOKEN} from "../../constants"


export default function SuggestedProfile({
  profileDocId,
  username,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);
  const { user } = GlobalDataState();

  async function handleFollowUser() {
    setFollowed(true);
    async function updateFollowedAndLoggedInUser() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user[ACCESS_TOKEN]}`,
            "Content-type": "application/json",
          },
        };

        //its implied, the jwt token has the id of the loggedin user and we need the following poeple's photos, and this api is for that exactly
        const { data } = await axios.put(
          "http://localhost:8001/api/v1/auth/updateLoggedInUserFollowing",
          {
            profileDocId: profileDocId,
            isFollowingProfile: false,
          },
          config
        );
        const { data_1 } = await axios.put(
          "http://localhost:8001/api/v1/auth/updateFollowedUserFollowers",
          { profileDocId: profileDocId, isFollowingProfile: false },
          config
        );
      } catch (error) {
        console.log("error", error);
      }
    }

    if (user) {
      updateFollowedAndLoggedInUser();
    }
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/imges/avatars/${username}.jpg`}
          alt=""
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

// SuggestedProfile.propTypes = {
//   loggedInUserDocId:PropTypes.string.isRequired,
//   profileDocId: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired,
//   profileId: PropTypes.string.isRequired,
//   userId: PropTypes.string.isRequired,
// };
