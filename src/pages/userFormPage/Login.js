import React, { useState } from "react";
import styles from "../userFormPage/Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../../Img/logo_main.png";
import { useNavigate } from "react-router-dom";
import Layout from "../../UI/Layout";
import axios from "axios";
import { setCookie } from "../../cookie/cookie";
import { BASE_URL } from "../../URL/url";

axios.defaults.withCredentials = true;

const LogIn = () => {
  const [isValid, setIsValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  /**로그인 form을 제출했을 때*/
  const onSubmit = async (data) => {
    // const resData = await fetch("http://127.0.0.1:8000/api/v1/users");

    // const userData = await resData.json();
    // console.log(userData);

    // const isEmailValid = userData.some((user) => {
    //   return data.email === user.email;
    // });

    // if (!isEmailValid) {
    //   setIsValid(true);
    //   return;
    // }
    // await axios({
    //   method: "POST",
    //   url: BASE_URL,
    //   data: data,
    //   withCredentials: true,
    // }).then((data) => console.log(data));

    const res = await axios
      .post(`${BASE_URL}users/login/`, data, {
        withCredentials: true,
      })
      .then((response) => {
        setIsValid(false);
        return response;
      })
      .catch((error) => {
        setIsValid(true);
        return error;
      });

    const isLogin = res.data.isLogin;

    /**로그인 처리 */
    setCookie("isLogin", isLogin);

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
            {(errors.email && <p>{errors.email.message}</p>) ||
              (errors.password && <p>{errors.password.message}</p>) ||
              (isValid && <p>아이디나 비밀번호가 다릅니다.</p>)}
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
