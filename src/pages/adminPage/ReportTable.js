import React, { useEffect, useState } from "react";
import styles from "./ReportTable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchingData } from "../../store/reportSchedules-action";
import { reportSchedulesActions } from "../../store/reportSchedules";
import Pagenation from "./Pagenation";
import { BASE_URL } from "../../URL/url";
import Modal from "../../UI/Modal";
import axios from "axios";
import ReportSchedule from "../userFormPage/ReportSchedule";
import { authActions } from "../../store/auth";

const ReportTable = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportSchedule.reportData);
  const searchData = useSelector((state) => state.reportSchedule.searchData);

  /**데이터 검색을 위한 상태 */
  const [searchInput, setSearchInput] = useState("");
  /**데이터 정렬을 위한 상태 */
  const [order, setOrder] = useState("ASC");
  /**페이지 네이션을 위한 상태 */
  const [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(0);

  const [scheduleModal, setScheduleModal] = useState(false);

  /**페이지당 목록 수 세팅 */
  const postPerPage = 8;

  /**제보받은 스케줄데이터 가져오기 */
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);

  useEffect(() => {}, [searchInput]);

  /**페이지네이션 데이터 */
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setToggle(pageNumber);
  };

  useEffect(() => {
    if (searchInput === "") {
      dispatch(reportSchedulesActions.searchSchedule(reportData));
    }
  }, [searchInput, dispatch, reportData]);

  /**검색기능 */
  const searchHandler = ({ target }) => {
    setSearchInput(target.value);
  };

  const searchFormHandler = (e) => {
    e.preventDefault();
    const searchData = reportData.filter((data) => {
      return data.content.includes(searchInput);
    });
    console.group();
    dispatch(reportSchedulesActions.searchSchedule(searchData));
  };

  /**Sorting 함수 */
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
        return a[col] < b[col] ? 1 : -1;
      }

      return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
    });
    dispatch(reportSchedulesActions.searchSchedule(sorted));

    setOrder("ASC");
  };

  const sorting = (col) => {
    if (order === "ASC") {
      sortingDsc(searchData, col);
    }
    if (order === "DSC") {
      sortingAsc(searchData, col);
    }
  };

  const showModalHandler = ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;

    console.log(rowIndex, searchData);

    const newIdolSchedule = searchData.filter((schedule) => {
      return schedule.id === Number(rowIndex);
    });

    console.log(newIdolSchedule[0].id);
    console.log(newIdolSchedule[0].pick);

    const modifyPk = {
      schedulePk: newIdolSchedule[0].id,
      idolPk: newIdolSchedule[0].pick,
    };

    dispatch(authActions.adminModify(modifyPk));

    setScheduleModal(true);
  };

  const hideModalHandler = () => {
    setScheduleModal(false);
  };

  /**스케줄삭제하기*/
  const deleteScheduleHandler = async ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;

    console.log(rowIndex, searchData);

    const newIdolSchedule = searchData.filter((schedule) => {
      return schedule.id === Number(rowIndex);
    });

    console.log(newIdolSchedule[0].id);
    const idolSchedulePk = newIdolSchedule[0].id;

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

  /**아이돌 스케줄에 제보받은 스케줄 등록하기 */
  const updateScheduleHandler = async ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;

    console.log(rowIndex, searchData);

    const newIdolSchedule = searchData.filter((schedule) => {
      return schedule.id === Number(rowIndex);
    });

    const idolPk = newIdolSchedule[0].pick;
    console.log(idolPk);

    const sendIdolData = {
      ScheduleTitle: newIdolSchedule[0].ScheduleTitle,
      ScheduleType: {
        type: newIdolSchedule[0].ScheduleType,
        content: newIdolSchedule[0].content,
      },
      location: newIdolSchedule[0].location,
      when: newIdolSchedule[0].when,
      ScheduleContent: newIdolSchedule[0].content,
    };

    console.log(sendIdolData);

    await axios
      .post(`${BASE_URL}idols/${idolPk}/schedules`, sendIdolData, {
        withCredentials: true,
      })
      .then((data) => console.log(data))
      .catch((data) => console.log(data));
  };

  return (
    <>
      {scheduleModal ? (
        <Modal hideCartHandler={hideModalHandler}>
          <ReportSchedule hideModalHandler={hideModalHandler} />
        </Modal>
      ) : null}
      <div className={styles.scheduleDiv}>
        <form className={styles.searchForm} onSubmit={searchFormHandler}>
          <label>🔍</label>
          <input
            name="searchSchedule"
            onChange={searchHandler}
            placeholder="search"
          />
          <button type="submit">검색</button>
          <input
            className={styles.resetBtn}
            type="reset"
            value="x"
            onClick={() => setSearchInput("")}
          />
        </form>

        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th
                onClick={() => {
                  sorting("id");
                }}
              >
                Id
              </th>
              <th
                onClick={() => {
                  sorting("name");
                }}
              >
                Name
              </th>
              <th
                onClick={() => {
                  sorting("ScheduleTitle");
                }}
              >
                Schedule Title
              </th>
              <th
                onClick={() => {
                  sorting("content");
                }}
              >
                Content
              </th>
              <th
                onClick={() => {
                  sorting("when");
                }}
              >
                When
              </th>
              <th
                onClick={() => {
                  sorting("ScheduleType");
                }}
              >
                Schedule Type
              </th>
              <th
                onClick={() => {
                  sorting("reporter");
                }}
              >
                Reporter
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((schedule) => {
              return (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>
                    {schedule.name} ({schedule.pick})
                  </td>
                  <td>{schedule.ScheduleTitle}</td>
                  <td>{schedule.content}</td>
                  <td>{schedule.when}</td>
                  <td>{schedule.ScheduleType}</td>
                  <td>{schedule.reporter}</td>
                  <td>
                    <button
                      onClick={deleteScheduleHandler}
                      className={styles.listBtn}
                    >
                      ✂️
                    </button>
                    <button
                      onClick={showModalHandler}
                      className={styles.listBtn}
                    >
                      📝
                    </button>
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

export default ReportTable;
