import { reportSchedulesActions } from "./reportSchedules";

export const fetchingData = () => {
  return async (dispatch) => {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/reports/");
    const datas = await res.json();

    const newData = [];

    for (let data in datas) {
      newData.push({
        id: data,
        // name: datas[data].whoes[0].idol_name,
        price: datas[data].time,
        type: datas[data].type,
        description: datas[data].content,
      });
    }

    dispatch(reportSchedulesActions.updateSchedule(newData));
  };
};
