import React from "react";
import { useSelector } from "react-redux";

const MainPage = () => {
  const userToken = useSelector((state) => state.auth.userToken);

  return (
    <>
      <div>MainPage</div>
      <button
        onClick={() => {
          console.log(userToken);
        }}
      >
        view Token
      </button>
    </>
  );
};

export default MainPage;
