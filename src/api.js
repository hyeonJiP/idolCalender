import axios from "axios";
import { BASE_URL } from "./URL/url";

// export const BASE_URL = "http://54.180.31.174:8000/api/v1/idols";

export function axiosSchedule(idolId) {
  return axios(`${BASE_URL}idols/${idolId}/schedules`).then(
    (response) => response.data
  );
}
//commit

export function axiosIdol() {
  return axios(`${BASE_URL}idols/`).then((response) => response.data);
}

export function axiosSchedules() {
  return axios(`${BASE_URL}idols/schedules/`).then((response) => response.data);
}

export const axiosIdolSchedule = async (idolId) => {
  return await axios(`${BASE_URL}idols/${idolId}/`).then(
    (response) => response.data
  );
};
