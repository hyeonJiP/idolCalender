import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../UI/Layout";
import styles from "./EditUser.module.scss";

const EditUser = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  /**PUT */
  const onSubmit = (data) => {
    const signUpInform = {
      password: data.password,
      choe: data.choe,
    };
  };

  return (
    <Layout>
      <h1 className={styles.title}>회원정보 수정</h1>
      <div className={styles.signUp}>
        <div className={styles.signUpContainer}>
          <h2>프로필 정보</h2>
          <div className={styles.userImg}>
            <div className={styles.imgInner}></div>
          </div>
          <div className={styles.containerBtnDiv}>
            <button>변경</button>
            <button>삭제</button>
          </div>
        </div>
        <hr />
        <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.typeAbsoluteDiv}>
            <label>아이디</label>
            <div className={styles.absoluteInform}>chhw130</div>
          </div>
          <div className={styles.typeDiv}>
            <label>비밀번호 변경</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: {
                  value: true,
                  message: "비밀번호를 입력하세요.",
                },
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "비밀번호는 16자 이하로 입력하세요.",
                },
                pattern: {
                  // eslint-disable-next-line
                  value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                  message: "비밀번호에 특수문자 1개 이상 넣어주세요.",
                },
                // pattern: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>비밀번호 확인</label>
            <input
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: true,
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

          <div className={styles.typeAbsoluteDiv}>
            <label>별명</label>
            <div className={styles.absoluteInform}>Choe</div>
          </div>

          <div className={styles.typeDiv}>
            <label>최애 변경</label>
            <select name="choe" {...register("choe")}>
              <option>최애를 등록해주세요.</option>
              <option>idol1</option>
              <option>idol2</option>
              <option>idol3</option>
            </select>
          </div>

          <div className={styles.buttonDiv}>
            <button
              onClick={() => {
                navigate(-1);
              }}
              type="button"
            >
              이전
            </button>
            <button>수정하기</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditUser;
