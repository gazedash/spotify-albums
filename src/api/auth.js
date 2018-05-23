// @flow
import CLIENT_ID from "./secret";
import { parse } from "qs";
import _ from "lodash";

let REDIRECT_URI = window.location.origin;
const scopes = `&scope=${encodeURIComponent(
  "playlist-modify-public playlist-modify-private"
)}`;

function getLoginURL() {
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=token${scopes}`;
}

export function windowClosedPromise(win: window): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // A mock async action using setTimeout
    let winClosed = setInterval(() => {
      console.log(win);
      if (_.get(win, "closed")) {
        clearInterval(winClosed);
        resolve(true);
      }
    }, 300);
  });
}

export function openLogin() {
  const url = getLoginURL();

  const width = 450,
    height = 730,
    left = window.screen.width / 2 - width / 2,
    top = window.screen.height / 2 - height / 2;
  return window.open(
    url,
    "_blank",
    `menubar=no,location=1,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
  );
}
export function getAccessToken() {
  const expires = localStorage.getItem("expires");
  if (new Date().getTime() > parseInt(expires, 10)) {
    return "";
  }
  const token = localStorage.getItem("token");
  return token;
}
export function setAccessToken(token: string, expires_in: number) {
  localStorage.setItem("token", token);
  localStorage.setItem(
    "expires",
    (new Date().getTime() + parseInt(expires_in, 10)).toString()
  );
}

export function redirected() {
  const query = parse(window.location.href.split("#")[1]);
  if (query && query.access_token && query.expires_in) {
    setAccessToken(query.access_token, query.expires_in);
    window.close();
  }
}

export default {
  setAccessToken,
  getAccessToken,
  openLogin,
  getLoginURL,
  redirected,
  windowClosedPromise
};
