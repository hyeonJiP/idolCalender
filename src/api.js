import axios from "axios";
import { response } from "msw";
import { useEffect, useState } from "react";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/idols";

// 아이돌의 ID를 파라미터로 전달받아 특정 URL에 HTTP GET 요청
export function axiosSchedule(idolId) {
  //   console.log(idolId);
  return axios(`${BASE_URL}/${idolId}/schedules`).then(
    (response) => response.data
    //.catch((e) => console.log(e));
  );
}

export function axiosIdol() {
  return axios(`${BASE_URL}`).then((response) => response.data);
}

// 스케줄 정보 불러오기
export function axiosSchedules() {
  return axios(`${BASE_URL}/schedules/`).then((response) => response.data);
}
