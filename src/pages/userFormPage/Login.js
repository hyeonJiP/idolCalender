import React, { useRef, useState } from "react";
import styles from "../userFormPage/Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../../Img/logo_main.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import Layout from "../../UI/Layout";
import { setCookie } from "../../cookie/cookie";

const LogIn = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.userToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const tokenRef = useRef();

  if (userToken) {
    navigate("/");
  }

  const goBackHandler = () => {
    navigate("/");
  };

  /**토큰이 있으면(로그인이 되어있으면) */

  /**로그인 form을 제출했을 때*/
  const onSubmit = async (data) => {
    console.log(data);
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const backEndData = res.type;

    console.log("login?", backEndData);
    /**fetch response 오류가 있을때 (ex: id중복) */
    if (!res.ok) {
      return;
    }

    /**토큰을 쿠키에 저장하기 */

    dispatch(authActions.logIn(backEndData));

    /**토큰을 세션스토리지에 저장 */
    // const token = res.url;
    // dispatch(authActions.logIn(token));
    // tokenRef.current = token;
    // sessionStorage.setItem("userToken", tokenRef.current);

    /**메인으로 내비게이트 */
    navigate("/");
  };

  return (
    <Layout>
      <div className={styles.logInDiv}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
          <img className={styles.mainImg} src={choeImg} alt="" />
          <h1>로그인</h1>
          <input
            className={styles.logInInput}
            name="email"
            type="email"
            placeholder="UserEmail"
            {...register("email", {
              required: "ID를 입력해주세요.",
            })}
          />
          <input
            className={styles.logInInput}
            name="password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password를 입력해주세요.",
            })}
          />
          <div className={styles.errorMessage}>
            {
              (errors.email && <p>{errors.email.message}</p>) ||
                (errors.password && <p>{errors.password.message}</p>)
              //|| (isIdExist && <p>아이디 중복입니다.</p>)
            }
          </div>
          <div className={styles.goSignUp}>
            <button
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Not user?
            </button>
          </div>
          <div className={styles.buttonDiv}>
            <button onClick={goBackHandler} type="button">
              홈으로
            </button>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default LogIn;
