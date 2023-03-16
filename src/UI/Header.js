import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./Header.scss";
//import { logoImg } from "../api";
//import { useQuery } from "react-query";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import { BASE_URL } from "../URL/url";

const Headar = () => {
  // const [navColor, setnavColor] = useState("transparent");
  // const listenScrollEvent = () => {
  //   window.scrollY > 10 ? setnavColor("#ffff") : setnavColor("transparent");
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", listenScrollEvent);
  //   return () => {
  //     window.removeEventListener("scroll", listenScrollEvent);
  //   };
  // }, []);
  const [navSize, setnavSize] = useState("6rem");
  const [navColor, setnavColor] = useState("transparent");

  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#ffff") : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("3rem") : setnavSize("5rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const LogoutHandler = async () => {
    axios
      .post(`${BASE_URL}users/logout`, "", {
        withCredentials: true,
      })
      .then((res) => res)
      .then((data) => console.log(data));

    dispatch(authActions.logOut(false));
  };

  return (
    <div
      className="header"
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all 1s",
      }}
    >
      <div className="headerNav">
        <div className="navItems">
          <div className="navItem">
            <Link to={"/"}>
              <img
                className="navImg"
                src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
              ></img>
            </Link>
          </div>
          <div className="navItem navSpan">
            <Link to={"/:idolId"}>
              <span className="navItem_span">스케줄 보기</span>
            </Link>
          </div>
        </div>
        <div className="navItems">
          <div className="navItem">
            {!isLogin ? (
              <Link to={"/login"}>
                <>
                  <button className="navBtn">Login</button>
                </>
              </Link>
            ) : (
              <>
                <button className="navBtn">
                  <Link to="/edituser">내 정보</Link>
                </button>
                <button className="navBtn" onClick={LogoutHandler}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Headar;
