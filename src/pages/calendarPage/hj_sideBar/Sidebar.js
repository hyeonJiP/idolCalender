import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.scss";
import {
  faBroadcastTower,
  faCalendarCheck,
  faCompactDisc,
  faGift,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarNav = styled.nav`
  background-color: #5b5be8;
  padding: 0 20px;
  width: 430px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 99;
  overflow: auto;
`;

const Sidebar = ({
  sidebar,
  setSidebarClose,
  todayDate,
  newIdolDateSchedule,
}) => {
  // 사이드바 외부 클릭시 닫히는 함수
  const outside = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const handleClose = async (e) => {
    if (!outside.current.contains(e.target)) {
      //현재 클릭한 곳이 메뉴 컴포넌트 안이 아니면 닫기
      setSidebarClose(false);
    }
  };

  console.log(newIdolDateSchedule);

  return (
    <>
      <SidebarNav sidebar={sidebar} ref={outside}>
        <div className={styles.sidebarWrap}>
          <Link to="#" className={styles.navIcon}>
            <AiIcons.AiOutlineClose
              style={{ color: "white" }}
              onClick={() => {
                setSidebarClose(false);
                // console.log(sidebar);
              }}
            />
          </Link>
          <div className={styles.sideSchedule_top}>
            <h3 className={styles.todayTitle}>
              오늘의 스케줄을
              <br />
              놓치지 마세요
            </h3>
            <ul className={styles.todaySchedule_List}>
              {newIdolDateSchedule.map((item) => {
                const scheduleIcon =
                  item.ScheduleType.type === "broadcast"
                    ? faBroadcastTower
                    : item.ScheduleType.type === "event"
                    ? faCalendarCheck
                    : item.ScheduleType.type === "release"
                    ? faCompactDisc
                    : item.ScheduleType.type === "congrats"
                    ? faGift
                    : faStore;

                return (
                  <li className={styles.todaySchedule_Item} key={item.pk}>
                    <FontAwesomeIcon icon={scheduleIcon} /> {item.ScheduleTitle}
                  </li>
                );
              })}
            </ul>
          </div>
          <hr />
          <div className={styles.sideSchedule_bot}>
            <h3 className={styles.todayTitle}>
              나의 스케줄을
              <br />
              놓치지 마세요
            </h3>
            <ul className={styles.todaySchedule_List}>
              {SidebarData.map((item, index) => {
                return (
                  <li className={styles.todaySchedule_Item} key={index}>
                    <div className={styles.editDiv_le}>{item.title}</div>
                    <div className={styles.editDiv_ri}>
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
