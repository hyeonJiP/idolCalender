import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../URL/url";

const Confirm = (props) => {
  const idolSchedulePk = useSelector(
    (state) => state.auth.authState.pick.schedulePk
  );
  const idolPk = props.idolPk;

  const deleteScheduleHandler = async () => {
    axios
      .delete(`${BASE_URL}users/reports/${idolSchedulePk}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        return window.location.reload();
      })
      .catch((data) => console.log(data));
  };

  const upLoadScheduleHandler = async () => {
    await axios
      .post(`${BASE_URL}idols/${idolPk}/schedules`, props.upLoadData, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((data) => console.log(data));
  };

  return (
    <div>
      {props.scheduleModal === "del" ? (
        <>
          <div>정말 삭제하시겠습니까??</div>
          <button onClick={props.hideModalHandler}>취소</button>
          <button onClick={deleteScheduleHandler}>삭제하기</button>
        </>
      ) : (
        <>
          <div>정말 아이돌스케줄에 업로드 하시겠습니까??</div>
          <button onClick={props.hideModalHandler}>취소</button>
          <button onClick={upLoadScheduleHandler}>등록하기</button>
        </>
      )}
    </div>
  );
};

export default Confirm;

// const idolSchedule = {};
