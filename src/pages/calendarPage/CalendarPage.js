import { useParams } from "react-router-dom";
import "../css/calendar.css";
const Calendar = () => {
  const { idolId } = useParams();

  const today = new Date();

  // if (today === test2) {
  //   console.log("일치합니다");
  // } else {
  //   console.log("일지 하지 않습니다");
  // }

  const data = [
    {
      pk: 1,
      ScheduleTitle: "BROADCAST",
      ScheduleType: {
        type: "event",
        content: "방송",
      },
      location: "월드컵 경기장",
      when: "2023-03-23T18:00:00+09:00",
      description: "브이앱 라이브 동시송출",
      participant: [
        {
          pk: 1,
          idol_name: "UI",
          idol_group: null,
          idol_solo: "GirlSolo",
          idol_profile:
            "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
        },
      ],
    },
    {
      pk: 2,
      ScheduleTitle: "EVENT",
      ScheduleType: {
        type: "event",
        content: "축하",
      },
      location: "수원 경기장",
      when: "2023-03-23T18:00:00+09:00",
      description: "생일",
      participant: [
        {
          pk: 2,
          idol_name: "UI",
          idol_group: null,
          idol_solo: "GirlSolo",
          idol_profile:
            "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
        },
      ],
    },
    {
      pk: 3,
      ScheduleTitle: "RELEASE",
      ScheduleType: {
        type: "event",
        content: "발매",
      },
      location: "목동 경기장",
      when: "2023-03-23T18:00:00+09:00",
      description: "10주년 발매",
      participant: [
        {
          pk: 3,
          idol_name: "UI",
          idol_group: null,
          idol_solo: "GirlSolo",
          idol_profile:
            "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
        },
      ],
    },
  ];
  var one_after = new Date(today.setDate(today.getDate() + 1));
  var two_after = new Date(today.setDate(today.getDate() + 2));
  var three_after = new Date(today.setDate(today.getDate() + 3));
  console.log(JSON.stringify(one_after).slice(1, 11));

  const day = data[0].when;
  const slice = day.slice(0, 10);
  console.log(slice);

  // 유저 아이디 경로
  // console.log(data[2].participant[0].pk);

  // for (var i = 0; i < data.length; i++) {
  //   if (data[i].participant[0].pk === 3) {
  //     console.log(data[i].participant[0].pk);
  //   }
  // }

  // const day = data[0].when;
  // const slice = day.slice(0, 10);
  // console.log(slice);

  return (
    <div className="calendar">
      <span>아이돌 id는: {idolId}</span>
    </div>
  );
};
export default Calendar;
