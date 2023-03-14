import React, { useEffect, useRef, useState } from "react";
import styles from "./ReportTable.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchingData } from "../../store/reportSchedules-action";
import { reportSchedulesActions } from "../../store/reportSchedules";
import Pagenation from "./Pagenation";
import { BASE_URL } from "../../URL/url";

const ReportTabe = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportSchedule.reportData);
  const searchData = useSelector((state) => state.reportSchedule.searchData);

  const searchRef = useRef("");
  // const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(0);
  const postPerPage = 8;

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  /**제보받은 스케줄데이터 가져오기 */
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);

  /**pagenation */
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setToggle(pageNumber);
  };

  if (searchRef.current === "") {
    dispatch(reportSchedulesActions.searchSchedule(reportData));
  }
  /**검색기능 */
  const searchHandler = ({ target }) => {
    searchRef.current = target.value;

    const searchData = reportData.filter((data) => {
      return data.content.includes(searchRef.current);
    });
    dispatch(reportSchedulesActions.searchSchedule(searchData));
  };

  console.log("filter", reportData);
  /**스케줄 추가해주기 */
  const onSubmit = async (data) => {
    const addData = {
      name: data.name,
      content: data.content,
      time: data.time,
    };
    console.log(addData);

    const newData = [...reportData, addData];

    await fetch(`${BASE_URL}`, {
      method: "PUT",
      body: JSON.stringify(newData),
    });
    dispatch(reportSchedulesActions.updateSchedule(newData));
  };

  /**Sorting Function */
  const sortingDsc = (data, col) => {
    const sorted = [...data].sort((a, b) => {
      if (Number(a[col])) {
        return a[col] > b[col] ? 1 : -1;
      }

      return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
    });

    dispatch(reportSchedulesActions.searchSchedule(sorted));

    setOrder("DSC");
  };

  const sortingAsc = (data, col) => {
    const sorted = [...data].sort((a, b) => {
      if (Number(a[col])) {
        return a[col] > b[col] ? 1 : -1;
      }

      return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
    });
    dispatch(reportSchedulesActions.searchSchedule(sorted));

    setOrder("ASC");
  };

  /**스케줄 정렬기능 */
  const sorting = (col) => {
    if (order === "ASC") {
      sortingDsc(searchData, col);
    }
    if (order === "DSC") {
      sortingAsc(searchData, col);
    }
    if (searchRef.current === "") {
      dispatch(reportSchedulesActions.searchSchedule(reportData));
    }
  };

  /**스케줄삭제하기 */
  const deleteScheduleHandler = async ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;
    console.log(rowIndex);
    const newIdolSchedule = reportData.filter((schedule) => {
      return schedule.id !== rowIndex;
    });

    await fetch(
      "https://react-movie-eb9a3-default-rtdb.firebaseio.com/schedules.json",
      {
        method: "PUT",
        body: JSON.stringify(newIdolSchedule),
      }
    );
    dispatch(reportSchedulesActions.updateSchedule(newIdolSchedule));
  };

  /**아이돌 스케줄에 제보받은 스케줄 등록하기 */
  const updateScheduleHandler = async ({ target }) => {
    const rowIndex =
      target.parentNode.parentNode.firstElementChild.nextSibling.innerText;
    console.log(rowIndex);

    const newIdolSchedule = reportData.filter((schedule) => {
      return schedule.name === rowIndex;
    });

    console.log(newIdolSchedule);
    fetch(
      `https://react-movie-eb9a3-default-rtdb.firebaseio.com/${rowIndex}.json`,
      {
        method: "POST",
        body: JSON.stringify(newIdolSchedule),
      }
    );
  };

  return (
    <>
      <div className={styles.scheduleDiv}>
        <div className={styles.searchDiv}>
          <label>🔍</label>
          <input
            name="searchSchedule"
            onChange={searchHandler}
            placeholder="search"
          />
        </div>

        {/**추가할 데이터 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.addScheduleForm}
        >
          <label>name</label>
          <input
            name="name"
            {...register("name", {
              required: {
                value: true,
              },
            })}
          />
          <label>content</label>
          <input
            name="content"
            {...register("content", {
              required: {
                value: true,
              },
            })}
          />
          <label>time</label>
          <input
            name="time"
            {...register("time", {
              required: {
                value: true,
              },
            })}
          />
          <button type="submit" className={styles.addSchedule}>
            스케줄추가하기
          </button>
        </form>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th
                onClick={() => {
                  sorting("id");
                }}
              >
                key
              </th>
              <th
                onClick={() => {
                  sorting("name");
                }}
              >
                name
              </th>
              <th
                onClick={() => {
                  sorting("content");
                }}
              >
                content
              </th>
              <th
                onClick={() => {
                  sorting("time");
                }}
              >
                time
              </th>
              <th
                onClick={() => {
                  sorting("type");
                }}
              >
                type
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((schedule) => {
              return (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>{schedule.name}</td>
                  <td>{schedule.content}</td>
                  <td>{schedule.time}</td>
                  <td>{schedule.type}</td>
                  <td>
                    <button
                      onClick={deleteScheduleHandler}
                      className={styles.listBtn}
                    >
                      ✂️
                    </button>
                    <button className={styles.listBtn}>📝</button>
                    <button
                      onClick={updateScheduleHandler}
                      className={styles.listBtn}
                    >
                      📑
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagenation
          postPerPage={postPerPage}
          totalPosts={searchData.length}
          paginate={paginate}
          toggle={toggle}
        />
      </div>
    </>
  );
};

export default ReportTabe;
