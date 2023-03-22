import React from "react";
import styles from "./Button.module.scss";

export const CancelButton = (props) => {
  return (
    <button onClick={props.hideModalHandler} className={styles.cancel}>
      {props.children}
    </button>
  );
};

export const ConfirmButton = (props) => {
  return <button className={styles.confirm}>{props.children}</button>;
};
