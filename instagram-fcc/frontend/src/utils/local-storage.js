export function getAccessToken() {
  let user = localStorage.getItem("userInfo");
  let userObj = JSON.parse(user);
  return userObj["token"];
}
