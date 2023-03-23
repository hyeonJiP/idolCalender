import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.scss";
import { BASE_URL } from "../../../URL/url";
import axios from "axios";
import { useParams } from "react-router";

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

const Sidebar = ({ sidebar, setSidebar, newIdolSchedule, selectedDay }) => {
  // 사이드바 외부 클릭시 닫히는 함수
  const [newIdolDateSchedule, setNewIdolDateSchedule] = useState([]);
  const outside = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  });

  const category = newIdolSchedule.map((data) => data.ScheduleType.type);

  const newCategory = [...new Set(category)];

  const { idolId } = useParams();

  const idolScheduleDate = selectedDay.format("YYYY/MM/DD");

  // useEffect(() => {
  //   console.log(idolScheduleDate, idolId);
  //   let idolDateIdolSchedule = [];
  //   const fetchDayIdolSchedule = () => {
  //     newCategory.map(async (category) => {
  //       return await axios
  //         .get(
  //           `${BASE_URL}idols/${idolId}/schedules/${category}/${idolScheduleDate}/`
  //         )
  //         .then((res) => {
  //           res.data.forEach(
  //             (schedule) =>
  //               (idolDateIdolSchedule = [...idolDateIdolSchedule, schedule])
  //           );
  //           setNewIdolDateSchedule(idolDateIdolSchedule);
  //         });
  //     });
  //   };
  //   fetchDayIdolSchedule();
  // }, [idolScheduleDate, idolId, newCategory]);

  console.log(newIdolDateSchedule);

  const handleClose = async (e) => {
    if (!outside.current.contains(e.target)) {
      //현재 클릭한 곳이 메뉴 컴포넌트 안이 아니면 닫기
      setSidebar(false);
    }
  };

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <SidebarNav sidebar={sidebar} ref={outside}>
        <div className={styles.sidebarWrap}>
          <Link to="#" className={styles.navIcon}>
            <AiIcons.AiOutlineClose
              style={{ color: "white" }}
              onClick={showSidebar}
            />
          </Link>
          <div className={styles.sideSchedule_top}>
            <h3 className={styles.todayTitle}>
              오늘의 스케줄을
              <br />
              놓치지 마세요
            </h3>
            <ul className={styles.todaySchedule_List}>
              {SidebarData.map((item, index) => {
                {
                  return (
                    <li className={styles.todaySchedule_Item} key={index}>
                      {item.title}
                    </li>
                  );
                }
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
                {
                  return (
                    <li className={styles.todaySchedule_Item} key={index}>
                      <div className={styles.editDiv_le}>{item.title}</div>
                      <div className={styles.editDiv_ri}>
                        <button>수정</button>
                        <button>삭제</button>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        <div>
          {newIdolDateSchedule.map((data) => (
            <div>data </div>
          ))}
        </div>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
