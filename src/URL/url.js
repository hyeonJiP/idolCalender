import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/";

/**사진을 업로드 할 url 가져오는 함수 */
export const getUploadUrl = async (img) => {
  let resData = "";
  await axios
    .post(`${BASE_URL}media/photos/get-url/`, img.file, {
      withCredentials: true,
    })
    .then((data) => {
      resData = uploadImg(data, img);
      return resData;
    })
    .catch(() => {
      resData = false;
      return resData;
    });

  return resData;
};

/**받아온 url에 img를 넣어주기 */
const uploadImg = async (data, img) => {
  let resData = "";
  const form = new FormData();
  form.append("file", img.file[0]);
  await axios
    .post(data.data.uploadURL, form, {
      hedaers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    })
    .then((res) => {
      // console.log(res.data.result)
      resData = res.data.result;
      return res.data.result;
    });

  return resData;
};

/**특정 idol에 대한 스케줄 month데이터 불러오기 */
export const fetchMonthData = async (getMoment, activeButtons, idolId) => {
  const month = getMoment.format("YYYY/MM");
  const requests = activeButtons.map((category) =>
    axios
      .get(`${BASE_URL}idols/${idolId}/schedules/${category}/${month}/`)
      .then((res) => {
        const data = res.data.filter(
          (schedule, index) =>
            res.data.findIndex((item) => item.day === schedule.day) === index
        );
        return data;
      })
  );

  const responses = await Promise.all(requests);

  let newIdolData = responses.flat();

  console.log(newIdolData);

  return newIdolData;
};

/**특정 idol에 대한 day데이터 불러오기 */
export const fetchDayIdolSchedule = async (
  idolScheduleDate,
  newCategory,
  idolId
) => {
  const requests = newCategory.map((category) =>
    axios
      .get(
        `${BASE_URL}idols/${idolId}/schedules/${category}/${idolScheduleDate}/`
      )
      .then((res) => res.data)
  );
  const responses = await Promise.all(requests);

  let newIdolDateSchedule = responses.flat();

  return newIdolDateSchedule;
};
