import React, { useEffect, useState } from "react";
import styles from "../userFormPage/SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../UI/Layout";
import axios from "axios";
import { BASE_URL } from "../../URL/url";
import SignUpOption from "./SignUpOption";

const SignUp = () => {
  const [isEmailValid, setIsEmailValid] = useState();
  const [isPasswordValid, setIsPasswordValid] = useState();
  const [isError, setIsError] = useState([]);

  const [selectValue, setSelectValue] = useState("");
  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  /**백 유효성검사 */
  useEffect(() => {
    isError.email ? setIsEmailValid(isError.email[0]) : setIsEmailValid(false);
    isError.password
      ? setIsPasswordValid(isError.password[0])
      : setIsPasswordValid(false);
  }, [isEmailValid, isError]);

  /**링크 네비게이트 */
  const navigate = useNavigate();

  /**회원가입 form 제출시 */
  const onSubmit = async (data) => {
    const year = Number(data.birth.slice(0, 4));
    const date = new Date().getFullYear();
    const age = date - year + 1;

    /**백에 보내줄 데이터 */
    const signUpInform = {
      email: data.email,
      password: data.password,
      username: data.name,
      nickname: data.nickname,
      age: age,
      pick: Number(selectValue),
    };

    console.log(signUpInform);

    /**백에 데이터 POST하기 */
    await axios
      .post(`${BASE_URL}users/`, signUpInform, {
        withCredentials: true,
      })
      .then((data) => console.log(data))
      .catch((data) => {
        console.log(data.response.data);
        setIsError(data.response.data);
      });

    /**회원가입하면 로그인페이지로 이동 */
    // navigate("/login");
  };

  return (
    <Layout>
      <h1>회원가입</h1>
      <div className={styles.signUp}>
        <h2>회원정보</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.typeDiv}>
            <label>아이디(Email)</label>
            <input
              name="email"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "필수 정보입니다.",
                pattern: {
                  // eslint-disable-next-line
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
                maxLength: {
                  value: 40,
                  message: "40자까지 입력가능합니다.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {(errors.email && <p>{errors.email.message}</p>) ||
              (isEmailValid && <p> {isEmailValid}</p>)}
          </div>

          <div className={styles.typeDiv}>
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                minLength: {
                  value: 8,
                  message: "8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자까지 입력가능합니다.",
                },
                pattern: {
                  // eslint-disable-next-line
                  value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                  message: "특수문자 1개 이상 넣어주세요.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {(errors.password && <p>{errors.password.message}</p>) ||
              (isPasswordValid && <p> {isPasswordValid}</p>)}
          </div>

          <div className={styles.typeDiv}>
            <label>비밀번호 재확인</label>
            <input
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 재확인"
              {...register("passwordConfirm", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.passwordConfirm && errors.passwordConfirm.type === true && (
              <p>비밀번호를 입력하세요</p>
            )}
            {errors.passwordConfirm && <p>비밀번호가 다릅니다!!</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>성명</label>
            <input
              name="name"
              placeholder="이름을 입력하세요"
              {...register("name", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 10,
                  message: "20자까지 입력 가능합니다.",
                },
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message:
                    "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>생년월일</label>
            <input
              name="birth"
              type="date"
              {...register("birth", {
                validate: {
                  check: (val) => {
                    if (!val) {
                      return "필수 정보입니다.";
                    }
                  },
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.birth && <p>{errors.birth.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>별명</label>
            <input
              name="nickname"
              placeholder="닉네임을 입력하세요."
              {...register("nickname", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 15,
                  message: "15자까지 입력가능합니다.",
                },
                minLength: {
                  value: 2,
                  message: "2자 이상 입력하세요.",
                },
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message: "공백을 제거해 주세요.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.nickname && <p>{errors.nickname.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>최애 등록</label>
            {/* <select value={selectValue} onChange={onChangeSelect}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select> */}
            <select value={selectValue} onChange={onChangeSelect}>
              <SignUpOption />
            </select>
          </div>

          <div className={styles.buttonDiv}>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </button>

            <button>회원가입</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default SignUp;
