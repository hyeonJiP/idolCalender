import React, { useEffect, useRef, useState } from "react";
import styles from "../userFormPage/Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../../Img/logo_main.png";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const tokenRef = useRef(false);
  const [isIdExist, setIsIdExist] = useState(false);

  const goBackHandler = () => {
    navigate("/");
  };

  //로그인 form을 제출했을 때
  const onSubmit = async (data) => {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    //로그인 오류가 있을때
    if (!res.ok) {
      setIsIdExist(true);
      return;
    }
    console.log("response 데이터", res);

    setIsIdExist(false);

    //토큰을 세션스토리지에 저장
    const token = res.url;
    tokenRef.current = token;
    sessionStorage.setItem("userToken", tokenRef.current);

    //메인으로 내비게이트
    navigate("/");
    console.log(token);
  };

  return (
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
          {/* {errors.password ? <p>{errors.password.message}</p> : ""} */}
          {(errors.email && <p>{errors.email.message}</p>) ||
            (errors.password && <p>{errors.password.message}</p>) ||
            (isIdExist && <p>아이디 중복입니다.</p>)}
        </div>
        <div
          className={styles.goSignUp}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Not user?
        </div>
        <div className={styles.buttonDiv}>
          <button onClick={goBackHandler} type="button">
            홈으로
          </button>
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
