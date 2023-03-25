import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postUserCalendar } from "../../../URL/url";

const UserSchedule = ({ hideModalHandler }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postUserCalendar(data);
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>타이틀</label>
        <input
          name="title"
          type="text"
          placeholder="타이틀"
          {...register("title")}
        />
        <label>날짜</label>
        <input name="when" type="date" {...register("when")} />

        <button onClick={hideModalHandler} type="button">
          취소하기
        </button>
        <button type="submit">등록하기</button>
      </form>
    </>
  );
};

export default UserSchedule;
