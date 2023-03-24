// import "./Calendar.css";
import styles from "./Calendar.module.scss";
import { fetchData } from "./fetchData";

import axios from "axios";
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
import Sidebar from "../hj_sideBar/Sidebar";
import { axiosSchedule, axiosTodaySchedule, BASE_URL } from "../../../api";
import { useParams } from "react-router";

const Calendar = () => {
  const [idolSchedule, setIdolSchedule] = useState([]);

  // 아이돌 pk 정보 가져오기
  const { idolId } = useParams();
  //console.log(idolId);

  useEffect(() => {
    if (idolId) {
      // idolId 값이 유효할 때만 API 요청 보내도록 수정
      const fetchIdolSchedule = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/idols/${idolId}/schedules`
          );
          const data = response.data;
          const idolSchedule = data.map((schedule) => {
            const dateList = schedule.when.split("-");
            dateList[2] = dateList[2].substr(0, 2);
            const dateValue = dateList.join("");

            const typeObj = schedule.ScheduleType;
            const typeValue = typeObj.type;
            console.log(typeValue);
            return {
              date: dateValue,
              title: schedule.ScheduleTitle,
              content: schedule.ScheduleContent,
              category: typeValue,
            };
          });
          setIdolSchedule(idolSchedule);
        } catch (error) {
          console.log(error);
        }
      };
      fetchIdolSchedule();
    }
  }, [idolId]);

  const [selectedDay, setSelectedDay] = useState(null);

  // useState를 사용하여 달 단위로 변경
  const [getMoment, setMoment] = useState(moment());

  console.log(getMoment.format("YYYY/MM/DD"));

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

  const category = ["broadcast", "event", "release", "congrats", "buy", "my"];
  const todays = new Date();
  const year = todays.getFullYear();
  const month = todays.getMonth() + 1;
  const day = todays.getDate();

  // const category = "broadcast";
  //const year = "2023";
  //const month = "3";
  //const day = "23";

  // 선택된 오늘의 스케줄 가져오기
  // const { isLoding: todayLoding, data: todayData } = useQuery(
  //   ["info", idolId, category, year, month, day],
  //   () => {
  //     return axiosTodaySchedule(idolId, category, year, month, day);
  //   }
  // );
  // console.log(todayData);

  const [sidebarDatas, setsidebarDatas] = useState();
  // 사이드바
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = (filteredData, days) => {
    // console.log(filteredData);
    // console.log(days);
    console.log(filteredData);

    filteredData?.map((item, i) => {
      if (item.date === days.format("YYYYMMDD")) {
        const category = item.category;
        const year = days.format("YYYY");
        const month = days.format("MM");
        const day = days.format("DD");
        // console.log(category, year, month, day);
        const test = axiosTodaySchedule(
          idolId,
          category,
          year,
          month,
          day
        ).then((res) => {
          if (res) {
            setsidebarDatas(res);
          } else {
            setsidebarDatas(null);
          }

          //console.log("test", res);
        });
        //const test2 = axiosSchedule(idolId).then((res) => console.log(res));
      }
    });

    return setSidebar(!sidebar);
  };
  console.log(sidebarDatas);

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

              // 오늘 날짜에 today style 적용
              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                //console.log(days);
                return (
                  <td
                    key={index}
                    onClick={() => {
                      setSelectedDay(days);
                      showSidebar(filteredData, days);
                    }}
                    className={styles.today}
                  >
                    <span>
                      <div
                        className={
                          selectedDay &&
                          selectedDay.format("YYYYMMDD") ===
                            days.format("YYYYMMDD")
                            ? styles.dayContent
                            : null
                        }
                      >
                        {days.format("D")}
                      </div>
                    </span>
                    <div className={styles.eventContent}>
                      {/* {filteredData ? filteredData.data : ""}
                      <ShowEvent
                        filteredData={filteredData}
                        buttons={buttons}
                        days={days}
                      /> */}
                      <ShowEvent
                        filteredData={filteredData}
                        buttons={buttons}
                        days={days}
                      />
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
                    onClick={() => {
                      setSelectedDay(days);
                      showSidebar(filteredData, days);
                    }}
                  >
                    <span value={index}>
                      <div
                        className={
                          selectedDay &&
                          selectedDay.format("YYYYMMDD") ===
                            days.format("YYYYMMDD")
                            ? styles.dayContent
                            : null
                        }
                      >
                        {days.format("D")}
                      </div>
                    </span>
                    {/* 사이드바 */}

                    <div className={styles.eventContent}>
                      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                      <ShowEvent
                        filteredData={filteredData}
                        buttons={buttons}
                        days={days}
                      />
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

  // schedule 데이터
  const { data: schedule } = useQuery(["schedule", idolId], () =>
    fetchData(idolId)
  );

  const buttons = [
    { pk: 1, category: "broadcast", content: "방송", icon: faBroadcastTower },
    { pk: 2, category: "event", content: "행사", icon: faCalendarCheck },
    { pk: 3, category: "release", content: "발매", icon: faCompactDisc },
    { pk: 4, category: "congrats", content: "축하", icon: faGift },
    { pk: 5, category: "buy", content: "구매", icon: faStore },
    { pk: 6, category: "my", content: "My", icon: faUser },
  ];
  const [activeButtons, setActiveButtons] = useState([1, 2, 3, 4, 5, 6]);

  const handleClick = (buttonPk) => {
    if (activeButtons.length === 1 && activeButtons.includes(buttonPk)) {
      return;
    }
    const index = activeButtons.indexOf(buttonPk);

    if (index === -1) {
      setActiveButtons([...activeButtons, buttonPk]);
    } else {
      setActiveButtons([
        ...activeButtons.slice(0, index),
        ...activeButtons.slice(index + 1),
      ]);
    }
  };
  // console.log(schedule);
  const filteredData = schedule?.filter((item) =>
    activeButtons.includes(
      buttons.find((button) => button.category === item.category)?.pk
    )
  );

  // 카테고리 배열

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.controlContainer}>
        <button
          className={styles.prevBtn}
          onClick={() => {
            // clone() 은 기존의 moment가 아닌 새로운 객체를 반환했다는 의미
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <span className={styles.title}>{today.format("YYYY.MM")}</span>
        <button
          className={styles.nextBtn}
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
        <button
          className={styles.todayBtn}
          onClick={() => {
            setMoment(moment());
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>
      {/* <ul className={styles.testDiv}>
        {filteredData?.map((item, i) => (
          <li key={i} className={`${styles.listItem} ${styles[item.category]}`}>
            {item.title}
          </li>
        ))}
      </ul> */}

      {/* 버튼 */}
      <div className={styles.categoryContainer}>
        {buttons.map((btn) => (
          <button
            className={`${
              activeButtons.includes(btn.pk) ? styles.active : styles.inactive
            } 
             ${styles.buttonss}
            `}
            key={btn.pk}
            onClick={() => handleClick(btn.pk)}
          >
            <FontAwesomeIcon
              className={styles.icons}
              icon={btn.icon}
              size="sm"
            />
            {btn.content}
          </button>
        ))}
      </div>
      <table className={styles.calendarTable}>
        <tbody className={styles.calendarTbody}>
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

function ShowEvent({ days, idolId, buttons, filteredData }) {
  //const { idolId } = useParams();
  const { data: schedule } = useQuery(["schedule", idolId], () =>
    fetchData(idolId)
  );

  // 버튼 pk 추출
  const pks = buttons?.map((item) => item.pk);

  // category 추출(중복x)
  const category = [...new Set(schedule?.map((item) => item.category))];

  useEffect(() => {}, [schedule]);

  //const days = moment();

  return (
    <>
      <div className={styles.testDiv}>
        {filteredData?.map((item, i) => {
          if (
            days?.format("YYYYMMDD") == moment(item.date).format("YYYYMMDD")
          ) {
            return (
              <div
                key={i}
                className={`${styles.listItem} ${styles[item.category]}`}
              >
                {item.data}
              </div>
            );
          }
        })}
      </div>
      {/* <div className={styles.testDiv}>
        {filteredData?.map((item, i) => {
          if (
            days?.format("YYYYMMDD") == moment(item.date).format("YYYYMMDD")
          ) {
            return (
              <div
                key={i}
                className={`${styles.listItem} ${styles[item.category]}`}
              >
                {item.data}
              </div>
            );
          }
        })}
      </div> */}
    </>
  );
}
