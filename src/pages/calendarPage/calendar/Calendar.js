import "./Calendar.css";

import { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRotateRight,
  faChevronRight,
  faChevronLeft,
  faBroadcastTower,
  faCompactDisc,
  faStore,
  faGift,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import { useQuery } from "react-query";

const Calendar = () => {
  const [idolSchedule, setIdolSchedule] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/v1/idols/4/schedules")
  //     .then((res) => res.json())
  //     .then((data) => setIdolSchedule(data));
  // }, []);

  // console.log(idolSchedule);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/idols/4/schedules")
      .then((res) => res.json())
      .then((data) => {
        const setIdolSchedule = [];
        for (let i = 0; i < data.length; i++) {
          // YYYYMMDD 형태로 변환하는 작업
          let dateList = data[i].when.split("-");
          dateList[2] = dateList[2].substr(0, 2);
          let dateValue = dateList.join("");
          // console.log("dateValue: " + dateValue);

          // ScheduleType안에 있는 type을 가져오는 작업
          let typeObj = data[i].ScheduleType;
          let typeValue = typeObj[Object.keys(typeObj)[0]];
          // console.log("typeValue: " + typeValue);

          setIdolSchedule.push({
            date: dateValue,
            title: data[i].ScheduleTitle,
            content: data[i].ScheduleContent,
            category: typeValue,
          });
        }

        // console.log("setIdolSchedule:" + setIdolSchedule);
        // console.log(setIdolSchedule);

        return;
      });
    setIdolSchedule(idolSchedule);
  }, [idolSchedule]);

  // useState를 사용하여 달 단위로 변경
  const [getMoment, setMoment] = useState(moment());
  //   console.log(getMoment);

  const today = getMoment;

  // 그 달의 시작하는 week() 주
  const firstWeek = today.clone().startOf("month").week();

  //  1년은 52주가 존재하고 며칠이 더 있는데 이 부분을 달력은 53주로써 표현해야 함
  // 하지만 moment()는 내년의 첫 주인 1로 표시하기 때문에 마지막 주가 1이라면 53으로 표시
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  // 반복문을 사용하여 해당 달의 총주의 수만큼 반복문을 실행하고 테이블의 내용을 배열에 추가
  // 길이가 7인 arr를 생성 후 index를 기반으로 day을 표기
  const calendarArr = () => {
    let result = []; // 이번달 배열
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");
              // console.log(index);
              // console.log(days);

              //   console.log("data:" + data);
              //   console.log("index:" + index);
              // console.log(moment().format("YYYY.MM"));

              // 오늘 날짜에 today style 적용
              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td
                    key={index}
                    className="today"
                    // onClick={() =>
                    //   console.log(
                    //     days.format("M") + "월" + " " + days.format("D") + "일"
                    //   )
                    // }
                  >
                    <span>{days.format("D")}</span>
                    <div className="event-content">
                      <Show_event days={days} />
                    </div>
                  </td>
                );
                // 다른 달은 글씨 색 연하게
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index} style={{ color: "#c2c2c2" }}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    key={index}
                    onClick={() =>
                      console.log("clickedDay: " + days.format("D"))
                    }
                  >
                    <span
                      value={index}
                      // className={"click" + (index == clicked ? "active" : "")}
                      // onClick={toggleActive}
                    >
                      {days.format("D")}
                    </span>
                    <div className="event-content">
                      <Show_event days={days} />
                    </div>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <div className="calendar-container">
      <div className="control-container">
        <button
          className="prev-btn"
          onClick={() => {
            // clone() 은 기존의 moment가 아닌 새로운 객체를 반환했다는 의미
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <span className="title">{today.format("YYYY.MM")}</span>
        <button
          className="next-btn"
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
        <button
          className="today-btn"
          onClick={() => {
            setMoment(moment());
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

      <div className="category-container">
        <button className="category-btn">
          <FontAwesomeIcon icon={faBroadcastTower} size="sm" /> 방송
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faCompactDisc} size="sm" /> 발매
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faStore} size="sm" /> 구매
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faGift} size="sm" /> 축하
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faCalendarCheck} size="sm" /> 행사
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faUser} size="sm" /> my
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <td className="week">일</td>
            <td className="week">월</td>
            <td className="week">화</td>
            <td className="week">수</td>
            <td className="week">목</td>
            <td className="week">금</td>
            <td className="week">토</td>
          </tr>
          {calendarArr()}
        </tbody>
      </table>
    </div>
  );
};
export default Calendar;

const fetchData = () =>
  fetch("http://127.0.0.1:8000/api/v1/idols/4/schedules")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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

// Show_event(): 달력에 데이터를 보여주는 기능
function Show_event({ days }) {
  // console.log(days);
  // console.log("==========");
  // console.log("index: " + index);
  // console.log("days: " + days);
  const schedule = useQuery(["schedule"], fetchData);
  // const [idolSchedule, setIdolSchedule] = useState([]);

  useEffect(() => {
    console.log("checking", schedule.data);
  }, [schedule]);

  // console.log(idolSchedule);
  // useEffect(() => {
  //   console.log(
  //     "fetch2",
  //     data.then((res) => res)
  //   );
  //   setIdolSchedule(data);
  // }, []);

  // useEffect(() => {
  //   // console.log("cccc", idolSchedule);
  // }, [idolSchedule]);

  return (
    <>
      {schedule.data?.map((data, i) => {
        // console.log(data, i);
        if (days.format("YYYYMMDD") == moment(data.date).format("YYYYMMDD")) {
          // console.log(data.type);
          if (data.category === "broadcast") {
            return (
              <div key={i} className="broadcast">
                {data.data}
                {/* {data.content} */}
              </div>
            );
          } else if (data.category === "release") {
            return (
              <div key={i} className="release">
                {data.data}
              </div>
            );
          } else if (data.category === "buy") {
            return (
              <div key={i} className="buy">
                {data.data}
              </div>
            );
          } else if (data.category === "congrats") {
            return (
              <div key={i} className="congratulations">
                {data.data}
              </div>
            );
          } else if (data.category === "event") {
            return (
              <div key={i} className="event">
                {data.data}
              </div>
            );
          } else {
            return (
              <div key={i} className="my">
                {data.data}
              </div>
            );
          }
        }
      })}
    </>
  );
}
