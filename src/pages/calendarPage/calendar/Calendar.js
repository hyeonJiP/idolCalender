// import "./Calendar.css";
import styles from "./Calendar.module.scss";
import { fetchDayIdolSchedule, fetchMonthData } from "../../../URL/url";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
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
import { useParams } from "react-router";

const Calendar = ({ todayDate, setSidebarOpen }) => {
  const { idolId } = useParams();

  /**선택한 날 */
  const [selectedDay, setSelectedDay] = useState(moment());

  /**현재 보여주는 달의 날짜들 */
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

  /**이번달 데이터 */
  const [newIdolSchedule, setNewIdolSchedule] = useState([]);
  /**이번달 데이터와 클릭한 일자 데이터 */
  const [newIdolDateSchedule, setNewIdolDateSchedule] = useState([]);

  const newSelectedDay = selectedDay.format("YYYY/MM/DD");
  useEffect(() => {
    fetchMonthData(getMoment, activeButtons, idolId).then((data) =>
      setNewIdolSchedule(data)
    );
    fetchDayIdolSchedule(newSelectedDay, activeButtons, idolId).then((data) =>
      setNewIdolDateSchedule(data)
    );
  }, [activeButtons, idolId, getMoment, newSelectedDay]);

  todayDate(selectedDay, newIdolDateSchedule);

  /**클리한 버튼 toggle 함수 */
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

  /** */
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
                      setSidebarOpen(true);
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
                      <ShowEvent
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
                    onClick={(e) => {
                      setSelectedDay(days);
                      setSidebarOpen(true);
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

                    <div className={styles.eventContent}>
                      <ShowEvent
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
  // console.log(filteredData);

  // 카테고리 배열
  const category = [...new Set(filteredData?.map((item) => item.category))];
  const todays = new Date();
  const year = todays.getFullYear();
  const month = todays.getMonth() + 1;
  const day = todays.getDate();

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

function ShowEvent({ days, newIdolSchedule }) {
  return (
    <>
      <div className={styles.testDiv}>
        {newIdolSchedule?.map((item, i) => {
          if (days?.format("D") == moment(item.day)) {
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
