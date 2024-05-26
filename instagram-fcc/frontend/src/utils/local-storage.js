import {ACCESS_TOKEN} from "../constants"
export function getAccessToken() {
  let user = localStorage.getItem("userInfo");
  let userObj = JSON.parse(user);
  return userObj[ACCESS_TOKEN];
}
