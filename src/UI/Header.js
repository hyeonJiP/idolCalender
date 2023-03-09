import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../UI/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Headar = () => {
  const [navColor, setnavColor] = useState("transparent");
  const userToken = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#ffff") : setnavColor("transparent");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const LogoutHandler = () => {
    dispatch(authActions.logOut());
  };

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
                alt=""
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
            {!userToken ? (
              <Link to={"/login"}>
                <button className="navBtn">Login</button>
              </Link>
            ) : (
              <button className="navBtn" onClick={LogoutHandler}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Headar;
