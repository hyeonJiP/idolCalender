import { reportSchedulesActions } from "./reportSchedules";

export const fetchingData = () => {
  return async (dispatch) => {
    const res = await fetch(
      "https://react-movie-eb9a3-default-rtdb.firebaseio.com/schedules.json"
    );
    const datas = await res.json();

    const newData = [];
    for (let data in datas) {
      newData.push({
        id: data,
        name: datas[data].name,
        price: datas[data].price,
        description: datas[data].description,
      });
    }

    dispatch(reportSchedulesActions.updateSchedule(newData));
  };
};
