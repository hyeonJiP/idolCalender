import React from "react";
import styles from "./Pagenation.module.scss";

const Pagenation = ({ postPerPage, paginate, totalPosts }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.pageUl}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <p onClick={() => paginate(number)}>{number}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagenation;
