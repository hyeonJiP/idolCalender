import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CalendarPage.module.scss";
import Sidebar from "../hj_sideBar/Sidebar";
import { useQuery } from "react-query";
import { axiosSchedule, axiosSchedules } from "../../../api";
import Calendar from "../calendar/Calendar";

import {
  faBroadcastTower,
  faCompactDisc,
  faStore,
  faGift,
  faCalendarCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Test2 from "./Test2";

const CalendarData = () => {
  const { idolId } = useParams();

  // 아이돌 데이터들
  const { isLoding: idDataLoding, data: idData } = useQuery(
    ["info", idolId],
    () => {
      return axiosSchedule(idolId);
    }
  );

  const { isLoding: schedulesLoding, data: schedulesData } = useQuery(
    "schedules",
    axiosSchedules
  );

  // 다가오는 스케줄
  // 3일 이후 날짜 구하기

  const today = new Date();

  const one_after = new Date(today);
  one_after.setDate(today.getDate() + 1);

  const two_after = new Date(today);
  two_after.setDate(today.getDate() + 2);

  const three_after = new Date(today);
  three_after.setDate(today.getDate() + 3);

  // 3일 이후 날짜 문자화해서 년,월,일 정보 슬라이스
  const one_after_slice = one_after.toISOString().slice(0, 10);
  //console.log(one_after_slice);
  const two_after_slice = two_after.toISOString().slice(0, 10);
  //console.log(two_after_slice);
  const three_after_slice = three_after.toISOString().slice(0, 10);
  //console.log(three_after_slice);

  const oneType = idData?.filter(
    (item) => item.when.slice(0, 10) === one_after_slice
  );

  const twoType = idData?.filter(
    (item) => item.when.slice(0, 10) === two_after_slice
  );

  const threeType = idData?.filter(
    (item) => item.when.slice(0, 10) === three_after_slice
  );

  const type = (type) => {
    for (var i = 0; i < type?.length; i++) {
      if (type[i].ScheduleTitle.length > 0) {
        const a = type[i];
        return a;
      }
    }
  };
  const nextDay = [];
  const dayType = [oneType, twoType, threeType];

  for (var i = 0; i < dayType.length; i++) {
    if (type(dayType[i])) {
      nextDay.push(type(dayType[i]));
    }
  }

  //const icon = nextDay?.map((item) => item.ScheduleType.content);
  // const icons = [
  //   { pk: 1, category: "broadcast", icon: faBroadcastTower },
  //   { pk: 2, category: "event", icon: faCalendarCheck },
  //   { pk: 3, category: "release", icon: faCompactDisc },
  //   { pk: 4, category: "congrats", icon: faGift },
  //   { pk: 5, category: "buy", icon: faStore },
  //   { pk: 6, category: "my", icon: faUser },
  // ];

  //const filteredIcons = icons.filter((item) => icon.includes(item.category));

  /**사이드바 */
  const [sidebar, setSidebar] = useState(false);
  /**아이돌 day데이터 */
  const [newIdolDateSchedule, setNewIdolDateSchedule] = useState([]);

  /**클릭한 날짜와 그 날짜의 스케줄 */
  const todayDate = (date, idolDateSchedule) => {
    setNewIdolDateSchedule(idolDateSchedule);
  };

  const setSidebarOpen = (isSidebar) => {
    setSidebar(isSidebar);
  };

  const setSidebarClose = (isSidebar) => {
    setSidebar(isSidebar);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendar}>
        <div className={styles.calendarWrap}>
          <Calendar todayDate={todayDate} setSidebarOpen={setSidebarOpen} />
          <Sidebar
            sidebar={sidebar}
            setSidebarClose={setSidebarClose}
            todayDate={todayDate}
            newIdolDateSchedule={newIdolDateSchedule}
          />
        </div>
        <section className={styles.nextSchedule}>
          <div className={styles.nextSchedule_Title}>
            {/* <img
              className={styles.nextSchedule_Icon}
              src="https://www.blip.kr/resource/icon/ic-sc-celebration.svg"
              alt=""
            ></img> */}
            <h3 className={styles.nextSchedule_Content}>다가오는 스케줄</h3>
          </div>
          <ul className={styles.nextSchedule_List}>
            {nextDay?.map((day) => {
              const dateFormat = `${day.when.slice(5, 7)}월 ${day.when.slice(
                8,
                10
              )}일`;

              const { type: scheduleType } = day.ScheduleType;
              const scheduleIcon = {
                broadcast: faBroadcastTower,
                event: faCalendarCheck,
                release: faCompactDisc,
                congrats: faGift,
                store: faStore,
              }[scheduleType];

              const scheduleIconColor = {
                broadcast: "#443c68",
                event: "#537fe7",
                release: "#f16767",
                congrats: "#e7b10a",
                store: "#609966",
              }[scheduleType];

              return day.ScheduleTitle ? (
                <li className={styles.nextScheduleItem} key={day.pk}>
                  <div className={styles.nextSchedule_LeftWrapper}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className={styles.nextScheduleDay}>{dateFormat}</span>
                  </div>
                  <div className={styles.nextSchedule_LightWrapper}>
                    <ul className={styles.todaySchedule_List}>
                      <li className={styles.todaySchedule_Item} key={day.pk}>
                        <FontAwesomeIcon
                          icon={scheduleIcon}
                          color={scheduleIconColor}
                          className={styles.iconDIv}
                        />
                        <span className={styles.nextSchedule_ContentList}>
                          {day.ScheduleTitle}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};
export default CalendarData;
