import axios from "axios";

export const fetchData = (idolId) =>
  axios
    .get(`http://127.0.0.1:8000/api/v1/idols/${idolId}/schedules`)
    .then((response) => {
      const setIdolSchedule = response.data.map((schedule) => {
        const dateList = schedule.when.split("-");
        dateList[2] = dateList[2].substr(0, 2);
        const dateValue = dateList.join("");

        const typeObj = schedule.ScheduleType;
        const typeValue = typeObj.type;

        return {
          date: dateValue,
          title: schedule.ScheduleTitle,
          content: schedule.ScheduleContent,
          category: typeValue,
        };
      });

      return setIdolSchedule;
    });
