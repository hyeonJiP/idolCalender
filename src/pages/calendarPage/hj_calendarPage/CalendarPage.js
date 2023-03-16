import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Calendar.module.scss";
import { data } from "./CalendarData";
import Sidebar from "../hj_sideBar/Sidebar";
import { useQuery } from "react-query";
import { axiosSchedule } from "../../../api";
import Calendar from "../calendar/Calendar";

const CalendarData = () => {
  const { idolId } = useParams();

  // 아이돌 데이터들
  const { isLoding: idDataLoding, data: idData } = useQuery(
    ["info", idolId],
    () => {
      return axiosSchedule(idolId);
    }
  );

  // useEffect(() => {
  //   console.log(idData);
  //   const test = idData?.slice(0, 3);
  //   console.log(test[0].participant[0].idol_name);
  // }, [idData]);

  const today = new Date();

  var one_after = new Date(today.setDate(today.getDate() + 1));
  var two_after = new Date(today.setDate(today.getDate() + 1));
  var three_after = new Date(today.setDate(today.getDate() + 1));

  const one_after_slice = JSON.stringify(one_after).slice(1, 11);
  const two_after_slice = JSON.stringify(two_after).slice(1, 11);
  const three_after_slice = JSON.stringify(three_after).slice(1, 11);

  const oneType = data.filter(
    (item) => item.when.slice(0, 10) === one_after_slice
  );

  const twoType = data.filter(
    (item) => item.when.slice(0, 10) === two_after_slice
  );

  const threeType = data.filter(
    (item) => item.when.slice(0, 10) === three_after_slice
  );

  const type = (type) => {
    for (var i = 0; i < type.length; i++) {
      if (type[i].description.length > 0) {
        //a = type[i].description;
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

  // if (type(oneType)) {
  //   nextDay.push(type(oneType));
  // }

  // const nextDay = [type(oneType), type(twoType), type(threeType)];
  // console.log(nextDay);

  // 사이드바
  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendar}>
        <div className={styles.calendarWrap}>
          <Calendar />
          {/* <button onClick={showSidebar}>사이드바</button>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} /> */}
        </div>
        <section className={styles.nextSchedule}>
          <div className={styles.nextSchedule_Title}>
            <img
              className={styles.nextSchedule_Icon}
              src="https://www.blip.kr/resource/icon/ic-sc-celebration.svg"
            ></img>
            <h3 className={styles.nextSchedule_Content}>다가오는 스케줄</h3>
          </div>
          <ul className={styles.nextSchedule_List}>
            {nextDay?.map((day) => {
              const dateFormat = `${day.when.slice(5, 7)}월 ${day.when.slice(
                8,
                10
              )}일`;
              return (
                <li className={styles.nextScheduleItem} key={day.pk}>
                  <div className={styles.nextSchedule_LeftWrapper}>
                    <span className={styles.nextScheduleDay}>
                      ● {dateFormat}
                    </span>
                  </div>
                  <div className={styles.nextSchedule_LightWrapper}>
                    <img
                      className={styles.nextscheduleIcon}
                      src="https://www.blip.kr/resource/icon/ic-sc-celebration.svg"
                    ></img>
                    <p className={styles.nextSchedule_ContentList}>
                      {day.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};
export default CalendarData;
