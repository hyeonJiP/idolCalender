import React from "react";
import styles from "../userForm/Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../Img/logo_main.png";

const LogIn = () => {
  const { register, handleSubmit } = useForm();

  const goBackHandler = () => {
    console.log("goBack");
  };

  const onSubmit = (data) => {
    console.log("data", data);
    // const logInInform = {};
    // console.log(logInInform);
  };

  return (
    <div className={styles.logInDiv}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
        <img className={styles.mainImg} src={choeImg} alt="" />
        <h1>로그인</h1>
        <input
          className={styles.logInInput}
          name="Id"
          placeholder="Username"
          {...register("Id")}
        />
        <input
          className={styles.logInInput}
          name="password"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <div className={styles.goSignUp}>Not user?</div>
        <div className={styles.buttonDiv}>
          <button onClick={goBackHandler}>이전</button>
          <button>로그인</button>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
