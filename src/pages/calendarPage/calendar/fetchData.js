const fetchData = () =>
  fetch("http://127.0.0.1:8000/api/v1/idols/4/schedules")
    .then((res) => res.json())
    .then((data) => {
      const setIdolSchedule = [];
      for (let i = 0; i < data.length; i++) {
        // YYYYMMDD 형태로 변환하는 작업
        let dateList = data[i].when.split("-");
        dateList[2] = dateList[2].substr(0, 2);
        let dateValue = dateList.join("");

        // ScheduleType안에 있는 type을 가져오는 작업
        let typeObj = data[i].ScheduleType;
        let typeValue = typeObj[Object.keys(typeObj)[0]];

        setIdolSchedule.push({
          date: dateValue,
          title: data[i].ScheduleTitle,
          content: data[i].ScheduleContent,
          category: typeValue,
        });
      }
      console.log("fetch1", setIdolSchedule);
      return setIdolSchedule;
    });
