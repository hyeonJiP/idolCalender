import React from "react";
import { useForm } from "react-hook-form";
import styles from "./EditUser.module.scss";

const EditUserImg = () => {
  /**사진 수정하기 기능 */

  const { register, handleSubmit, reset } = useForm();

  const imgSubmit = (img) => {
    console.log(img);
  };
  return (
    <form className={styles.containerBtnDiv} onSubmit={handleSubmit(imgSubmit)}>
      <input type="file" {...register("file")} accept="image/*" />
      <button type="submit">변경</button>
      <button type="button" onClick={() => reset()}>
        삭제
      </button>
    </form>
  );
};

export default EditUserImg;
