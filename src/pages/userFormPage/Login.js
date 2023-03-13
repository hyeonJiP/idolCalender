import React, { useState } from "react";
import styles from "../userFormPage/Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../../Img/logo_main.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import Layout from "../../UI/Layout";
import axios from "axios";
import { getCookie } from "../../cookie/cookie";

axios.defaults.withCredentials = true;

const LogIn = () => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const userToken = useSelector((state) => state.auth.userToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  if (userToken) {
    navigate("/");
  }

  const goBackHandler = () => {
    navigate("/");
  };

  /**토큰이 있으면(로그인이 되어있으면) */

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
    //   url: "http://127.0.0.1:8000/api/v1/users/login",
    //   data: data,
    //   withCredentials: true,
    // }).then((data) => console.log(data));

    // axios
    //   .post("http://127.0.0.1:8000/api/v1/users/login", data, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const BASE_URL = "http://127.0.0.1:8000/api/v1/users/login";

    const cookieData = getCookie("csrftoken");

    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "X-CSRFToken": cookieData,
        "Content-Type": "application/json",
      },
    });

    console.log(instance);
    /**안되는 것... */
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //seesion ID
      body: JSON.stringify(data),
    });

    // console.log(res);

    /**로그인 response로 받은 token */
    // console.log("login?", backEndData);
    /**fetch response 오류가 있을때 (ex: id중복) */
    // if (!res.ok) {
    //   setIsValid(true);
    //   return;
    // throw new Error("이메일 혹은 비밀번호가 틀립니다.");
    // }

    /**토큰을 redux에 보냄 */
    navigate("/");
    /**토큰을 세션스토리지에 저장 */
    // const token = res.url;
    // dispatch(authActions.logIn(token));
    // tokenRef.current = token;
    // sessionStorage.setItem("userToken", tokenRef.current);

    /**메인으로 내비게이트 */
  };

  const getC = getCookie("csrftoken");

  console.log(getC);

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
