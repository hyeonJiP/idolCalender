// import "./Calendar.css";
import styles from "./Calendar.module.scss";
import { fetchData, fetchMonthData } from "./fetchData";

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
import { axiosSchedule, axiosTodaySchedule } from "../../../api";
import { useParams } from "react-router";
import { BASE_URL } from "../../../URL/url";

const Calendar = () => {
  // 아이돌 pk 정보 가져오기
  const { idolId } = useParams();

  /**스케줄 불러오기 */

  const buttons = [
    { pk: 1, category: "broadcast", content: "방송", icon: faBroadcastTower },
    { pk: 2, category: "event", content: "행사", icon: faCalendarCheck },
    { pk: 3, category: "release", content: "발매", icon: faCompactDisc },
    { pk: 4, category: "congrats", content: "축하", icon: faGift },
    { pk: 5, category: "buy", content: "구매", icon: faStore },
    { pk: 6, category: "my", content: "My", icon: faUser },
  ];
  const [activeButtons, setActiveButtons] = useState([
    "broadcast",
    "event",
    "release",
    "congrats",
    "buy",
    "my",
  ]);

  const [newIdolSchedule, setNewIdolSchedule] = useState([]);

  console.log(activeButtons);

  useEffect(() => {
    const fetchMonthData = async () => {
      let newIdolData = [];
      const month = getMoment.format("YYYY/MM");

      activeButtons.map(
        async (category) =>
          await axios
            .get(`${BASE_URL}idols/${idolId}/schedules/${category}/${month}/`)
            .then((res) => {
              res.data.forEach(
                (data) => (newIdolData = [...newIdolData, data])
              );

              setNewIdolSchedule(newIdolData);
            })
      );
    };
    fetchMonthData();
  }, [activeButtons]);
  console.log("what the..");

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
  const filteredData = [];

  /**선택한 날 */
  const [selectedDay, setSelectedDay] = useState(moment());

  // useState를 사용하여 달 단위로 변경
  const [getMoment, setMoment] = useState(moment());

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

  // 사이드바
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    return setSidebar(!sidebar);
  };

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
                      showSidebar();
                    }}
                    className={styles.today}
                  >
                    <span
                      className={
                        selectedDay &&
                        selectedDay.format("YYYYMMDD") ===
                          days.format("YYYYMMDD")
                          ? styles.selected
                          : null
                      }
                    >
                      {days.format("D")}
                    </span>
                    <div className={styles.eventContent}>
                      <ShowEvent
                        filteredData={filteredData}
                        buttons={buttons}
                        days={days}
                        newIdolSchedule={newIdolSchedule}
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
                      showSidebar();
                    }}
                  >
                    <span
                      value={index}
                      className={
                        selectedDay &&
                        selectedDay.format("YYYYMMDD") ===
                          days.format("YYYYMMDD")
                          ? styles.selected
                          : null
                      }
                    >
                      {days.format("D")}
                    </span>

                    <div className={styles.eventContent}>
                      <Sidebar
                        sidebar={sidebar}
                        setSidebar={setSidebar}
                        newIdolSchedule={newIdolSchedule}
                        selectedDay={selectedDay}
                      />
                      <ShowEvent
                        filteredData={filteredData}
                        buttons={buttons}
                        days={days}
                        newIdolSchedule={newIdolSchedule}
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

      {/* 버튼 */}
      <div className={styles.categoryContainer}>
        {buttons.map((btn) => (
          <button
            className={`${
              activeButtons.includes(btn.category)
                ? styles.active
                : styles.inactive
            } 
             ${styles.buttonss}
            `}
            key={btn.category}
            onClick={() => handleClick(btn.category)}
          >
            <FontAwesomeIcon icon={btn.icon} size="sm" />
            {btn.content}
          </button>
        ))}
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

function ShowEvent({ days, newIdolSchedule }) {
  return (
    <>
      <div className={styles.testDiv}>
        {newIdolSchedule?.map((item, i) => {
          if (
            days?.format("YYYYMMDD") === moment(item.date).format("YYYYMMDD")
          ) {
            return (
              <div
                key={i}
                className={`${styles.listItem} ${
                  styles[item.ScheduleType.type]
                }`}
              >
                {item.data}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
