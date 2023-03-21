import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportSchedulesActions } from "../../../store/reportSchedules";
import { BASE_URL } from "../../../URL/url";
import styles from "./SearchData.module.scss";

const SearchData = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportSchedule.reportData);
  const [idolSearchName, setIdolSearchName] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  /**존재하는 아이돌목록 */
  useEffect(() => {
    axios.get(`${BASE_URL}idols`).then((res) => {
      setIdolSearchName(res.data.map((data) => data.idol_name));
    });
  }, []);

  /**검색하기 인풋의 값 */
  useEffect(() => {
    if (searchInput === "") {
      dispatch(reportSchedulesActions.searchSchedule(reportData));
    }
  }, [searchInput, dispatch, reportData]);

  const searchHandler = ({ target }) => {
    setSearchInput(target.value);
  };

  /**검색하기 form 제출했을때 */
  const searchFormHandler = (e) => {
    e.preventDefault();
    const searchData = reportData.filter((data) => {
      let isTrue = false;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          if (isNaN(value)) {
            if (value.includes(searchInput)) {
              return (isTrue = true);
            }
          }
        }
      }
      return isTrue;
    });
    dispatch(reportSchedulesActions.searchSchedule(searchData));
  };
  return (
    <form className={styles.searchForm} onSubmit={searchFormHandler}>
      <label>🔍</label>
      <input
        className={styles.searchInput}
        list="data-options"
        name="searchSchedule"
        autoComplete="off"
        onChange={searchHandler}
        placeholder="search"
      />
      <datalist id="data-options" className={styles.searchInput}>
        {idolSearchName.map((schedule) => (
          <option key={Math.random()} value={schedule} />
        ))}
      </datalist>
      <button type="submit">검색</button>
      <input
        className={styles.resetBtn}
        type="reset"
        value="x"
        onClick={() => setSearchInput("")}
      />
    </form>
  );
};

export default SearchData;
