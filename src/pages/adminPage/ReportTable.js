import React, { useEffect, useRef, useState } from "react";
import styles from "./ReportTable.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchingData } from "../../store/reportSchedules-action";
import { reportSchedulesActions } from "../../store/reportSchedules";
import Pagenation from "./Pagenation";

const ReportTabe = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportSchedule.reportData);
  const searchData = useSelector((state) => state.reportSchedule.searchData);

  const searchRef = useRef("");
  // const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const [toggle, setToggle] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**제보받은 스케줄데이터 가져오기 */
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);

  /**pagenation */
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = reportData.slice(indexOfFirstPost, indexOfLastPost);
  // let currentPosts = isSearching
  //   ? `${searchData.slice(indexOfFirstPost, indexOfLastPost)}`
  //   : `${reportData.slice(indexOfFirstPost, indexOfLastPost)}`;

  console.log(currentPosts);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setToggle(pageNumber);
  };

  /**검색기능 */
  console.log(searchRef);
  const searchHandler = ({ target }) => {
    searchRef.current = target.value;

    const searchData = reportData.filter((data) => {
      return data.content.includes(searchRef.current);
    });
    dispatch(reportSchedulesActions.searchSchedule(searchData));
  };

  // if (searchRef === "") {
  //   setIsSearching(false);
  // } else {
  //   setIsSearching(true);
  // }

  /**스케줄 추가해주기 */
  const onSubmit = async (data) => {
    const addData = {
      name: data.name,
      content: data.content,
      time: data.time,
    };
    console.log(addData);

    const newData = [...reportData, addData];

    await fetch(
      "https://react-movie-eb9a3-default-rtdb.firebaseio.com/schedules.json",
      {
        method: "PUT",
        body: JSON.stringify(newData),
      }
    );
    dispatch(reportSchedulesActions.updateSchedule(newData));
  };

  /**스케줄 정렬기능 */
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...reportData].sort((a, b) => {
        if (Number(a[col])) {
          return a[col] > b[col] ? 1 : -1;
        }

        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      //   setIdolSchedule(sorted);
      dispatch(reportSchedulesActions.updateSchedule(sorted));
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...reportData].sort((a, b) => {
        if (Number(a[col])) {
          return a[col] < b[col] ? 1 : -1;
        }
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      //   setIdolSchedule(sorted);
      dispatch(reportSchedulesActions.updateSchedule(sorted));

      setOrder("ASC");
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
                  <td>{schedule.whoes}</td>
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
          totalPosts={reportData.length}
          paginate={paginate}
          toggle={toggle}
        />
      </div>
    </>
  );
};

export default ReportTabe;
