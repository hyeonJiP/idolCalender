import axios from "axios";
import { BASE_URL } from "../URL/url";
import { reportSchedulesActions } from "./reportSchedules";

export const fetchingData = () => {
  return async (dispatch) => {
    const res = await axios.get(`${BASE_URL}users/reports/`);
    const datas = await res.data;

    console.log(datas);
    /**새로운 데이터 형식으로 바꿔주기 */
    const newData = [];
    for (let data in datas) {
      let nameData = 0;
      if (!datas[data].whoes[0]) {
        nameData = "";
      } else {
        nameData = datas[data].whoes[0].idol_name;
      }

      newData.push({
        id: datas[data].id,
        pick: datas[data].owner.pick,
        name: nameData,
        time: datas[data].time,
        type: datas[data].type,
        content: datas[data].content,
      });
    }
    // console.log(newData);

    dispatch(reportSchedulesActions.updateSchedule(newData));
  };
};
