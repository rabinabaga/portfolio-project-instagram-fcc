import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/mongodb-queries";
import { useState } from "react";
import SuggestedProfile from "./suggested-profile";
import { GlobalDataState } from "../../context/GlobalDataProvider";
import axios from "axios";
import {ACCESS_TOKEN} from "../../constants"


export default function Suggestions() {
  const [profiles, setProfiles] = useState(null);
  const { user } = GlobalDataState();
 
  useEffect(() => {
    async function getSuggestedProfiles() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user[ACCESS_TOKEN]}`,
            "Content-type": "application/json",
          },
        };

        //its implied, the jwt token has the id of the loggedin user and we need the following poeple's photos, and this api is for that exactly
        const { data } = await axios.get(
          "http://localhost:8001/api/v1/auth/suggested-profiles",

          config
        );
        setProfiles(data.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    if (user) {
      getSuggestedProfiles();
    }
  }, [user]);

  return !profiles ? (
    <>no profile</>
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-5 grid gap-5">
        {profiles?.map((profile) => {
          return (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              loggedInUserDocId={user?._id}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}
