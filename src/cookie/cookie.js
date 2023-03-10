import { Cookies } from "react-cookie";
import moment from "moment";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
  const tokenData = cookies.get(name);

  return console.log(tokenData);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
