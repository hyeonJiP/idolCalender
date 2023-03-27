import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { axiosIdol, axiosSchedules } from "../../api";
import styles from "./Home.module.scss";
import {
  faBroadcastTower,
  faCompactDisc,
  faStore,
  faGift,
  faCalendarCheck,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const { isLoding: idolLoding, data: idolData } = useQuery("idol", axiosIdol);

  const slideImage = idolData?.slice(0, 24);

  const { isLoding: schedulesLoding, data: schedulesData } = useQuery(
    "schedules",
    axiosSchedules
  );
  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <div className={styles.home_mainBanner}>
          <video autoPlay loop muted className={styles.mainVideo}>
            <source src="/videos/heart.mp4" type="video/mp4"></source>
          </video>
        </div>
        <div className={styles.slider}>
          <div className={styles.slideBox}>
            {schedulesData?.map((data) => {
              const dateFormat = `${data.when.slice(5, 7)}월 ${data.when.slice(
                8,
                10
              )}일`;

              const { type: scheduleType } = data.ScheduleType;
              const scheduleIcon = {
                broadcast: faBroadcastTower,
                event: faCalendarCheck,
                release: faCompactDisc,
                congrats: faGift,
                buy: faStore,
              }[scheduleType];

              const scheduleIconColor = {
                broadcast: "#443c68",
                event: "#537fe7",
                release: "#f16767",
                congrats: "#e7b10a",
                buy: "#609966",
              }[scheduleType];

              return (
                <div className={styles.slide} key={Math.random()}>
                  <div className={styles.slideInner}>
                    <div className={styles.slideContent}>
                      <div className={styles.slideTop}>
                        <span>{dateFormat}</span>
                      </div>
                      <div className={styles.slideMid}>
                        <FontAwesomeIcon
                          icon={scheduleIcon}
                          color={scheduleIconColor}
                        />
                        <span className={styles.contentTitle}>
                          {data.ScheduleTitle}
                        </span>
                      </div>
                      <div className={styles.slideBot}>
                        <FontAwesomeIcon icon={faMicrophone} />
                        <span className={styles.nameTitle}>
                          {data.participant[0].idol_name_kr}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.artistSection}>
          <article>
            <div className={styles.artistFontWrapper}>
              <div className={styles.mainTitle}>
                <p>60팀의 아티스트를</p>
                <p>최애인에서 만나볼 수 있어요</p>
              </div>
              <div className={styles.subTitle}>
                <p>지금 인기있는 아티스트들을 선택하고</p>
                <p>스케줄을 확인해서 나만의 스케줄을 만들어보세요</p>
              </div>
            </div>
            <ul className={styles.artistImageWrapper}>
              {idolLoding
                ? "Loding.."
                : slideImage?.map((data) => (
                    <li className={styles.artistThumnail} key={data.pk}>
                      <Link to={`${data.pk}/calendar/`}>
                        <img
                          className={styles.artistImage}
                          src={data.idol_profile}
                          alt="아티스트 이미지"
                        ></img>
                        <h3 className={styles.artistName}>
                          {data.idol_name_kr}
                        </h3>
                        <p className={styles.artistFont}>{data.idol_name_en}</p>
                      </Link>
                    </li>
                  ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
};
export default Home;
