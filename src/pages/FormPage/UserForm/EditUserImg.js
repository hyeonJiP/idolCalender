import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../URL/url";
import styles from "./EditUser.module.scss";

const EditUserImg = () => {
  /**사진 수정하기 기능 */

  const [img, setImg] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const imgSubmit = async (img) => {
    console.log(img.file);
    await axios
      .post(`${BASE_URL}media/photos/get-url/`, img.file, {
        withCredentials: true,
      })
      .then((data) => {
        const form = new FormData();
        console.log(data);
        form.append("file", img.file[0]);
        axios
          .post(data.data.uploadURL, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
          })
          .then((res) => console.log(res));
      });

    setImg(img.file[0]);
  };

  console.log("Data", img);

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
