import React, { useEffect, useRef, useState } from "react";
import styles from "./ReportTable.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchingData } from "../../store/reportSchedules-action";
import { reportSchedulesActions } from "../../store/reportSchedules";

const ReportTabe = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.reportSchedule.reportData);

  const searchRef = useRef();
  const [order, setOrder] = useState("ASC");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**제보받은 스케줄데이터 가져오기 */
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);

  /**검색기능 */
  const searchHandler = ({ target }) => {
    searchRef.current = target.value;
    const newIdolSchedule = reportData.filter((schedule) => {
      let data = "";
      if (schedule.name.includes(searchRef.current)) {
        data = reportData;
        console.log(data);
        return data;
      }
      // if(!schedule.name.includes(searchRef.current))
    });
    // console.log(newIdolSchedule, "newidol");

    dispatch(reportSchedulesActions.updateSchedule(newIdolSchedule));
  };

  /**스케줄 추가해주기 */
  const onSubmit = async (data) => {
    const addData = {
      name: data.name,
      description: data.description,
      price: data.price,
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
    <div className={styles.scheduleDiv}>
      <label>검색</label>
      <input name="searchSchedule" onChange={searchHandler} />
      <button onClick={searchHandler}>검색하기</button>

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
        <label>description</label>
        <input
          name="description"
          {...register("description", {
            required: {
              value: true,
            },
          })}
        />
        <label>price</label>
        <input
          name="price"
          {...register("price", {
            required: {
              value: true,
            },
          })}
        />
        <button type="submit">스케줄추가하기</button>
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
                sorting("description");
              }}
            >
              description
            </th>
            <th
              onClick={() => {
                sorting("price");
              }}
            >
              price
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((schedule) => {
            return (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.name}</td>
                <td>{schedule.description}</td>
                <td>{schedule.price}</td>
                <td>
                  <button onClick={deleteScheduleHandler}>삭제</button>
                  <button>수정</button>
                  <button onClick={updateScheduleHandler}>
                    스케줄에 업데이트
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTabe;
