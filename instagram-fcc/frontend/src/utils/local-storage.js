import {ACCESS_TOKEN} from "../constants"
export function getAccessToken() {
  let user = localStorage.getItem("userInfo");
  let userObj = JSON.parse(user);
  if(userObj){
    return userObj[ACCESS_TOKEN];
  }
  
}
