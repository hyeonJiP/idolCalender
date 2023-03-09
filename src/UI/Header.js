import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "../css/header.css";
//import { logoImg } from "../api";
//import { useQuery } from "react-query";

const Headar = () => {
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#ffff") : setnavColor("transparent");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundColor: navColor,
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
            <Link to={"/"}>
              <button className="navBtn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Headar;
