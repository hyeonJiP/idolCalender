import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import { BASE_URL } from "../URL/url";
import { setCookie } from "../cookie/cookie";

const Headar = () => {
  const navigate = useNavigate();
  const [navSize, setnavSize] = useState("6rem");
  const [navColor, setnavColor] = useState("transparent");

  const isLogin = useSelector((state) => state.auth.authState.pick.idolPk);
  const isAdmin = useSelector((state) => state.auth.authState.is_admin);
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

  /**로그아웃 */
  const LogoutHandler = async () => {
    axios
      .post(`${BASE_URL}users/logout/`, "", {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data));
    setCookie("isLogin", { is_admin: false, pick: false });
    dispatch(authActions.logOut());
    navigate("/");
    window.location.reload();
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
            <Link to="/">
              <img
                className="navImg"
                src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
                alt=""
              ></img>
            </Link>
          </div>
          <div className="navItem navSpan">
            {!isAdmin ? (
              <Link to={"/:idolId"}>
                <span className="navItem_span">스케줄 보기</span>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="navItems">
          <div className="navItem">
            {isAdmin ? (
              <>
                <Link to="/adminpage">
                  <button className="navBtn">관리자페이지</button>
                </Link>
                <button className="navBtn" onClick={LogoutHandler}>
                  로그아웃
                </button>
              </>
            ) : !isLogin ? (
              <Link to="/login">
                <button className="navBtn">로그인</button>
              </Link>
            ) : (
              <>
                <button className="navBtn">
                  <Link to="/edituser">내 정보</Link>
                </button>
                <button className="navBtn" onClick={LogoutHandler}>
                  로그아웃
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
