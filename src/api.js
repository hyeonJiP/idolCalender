import axios from "axios";
import { response } from "msw";
import { useEffect, useState } from "react";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/idols";

// export function fetchSchedule(idolId) {
//   //   console.log(idolId);
//   return fetch(`http://127.0.0.1:8000/api/v1/idols/${idolId}/schedules`).then(
//     (response) => response.json()
//     //.catch((e) => console.log(e));
//   );
// }
export function axiosSchedule(idolId) {
  //   console.log(idolId);
  return axios(`${BASE_URL}/${idolId}/schedules`).then(
    (response) => response.data
    //.catch((e) => console.log(e));
  );
}
//commit

export function axiosIdol() {
  return axios(`${BASE_URL}`).then((response) => response.data);
}

export function axiosSchedules() {
  return axios(`${BASE_URL}/schedules/`).then((response) => response.data);
}

// useEffect(() => {
//   (async () => {
//     const response = await (
//       await fetch(`${BASE_URL}/${idolId}/schedules`)
//     ).json();
//     console.log(response[0].pk);
//   })();
// });
