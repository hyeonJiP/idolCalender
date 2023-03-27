import React, { useState } from "react";
import "./Category.css";

const category = [
  {
    pk: 1,
    ScheduleTitle: "test1",
    ScheduleType: {
      type: "broadcast",
      content: "test",
    },
    location: "서울",
    when: "2023-03-20T10:36:05+09:00",
    ScheduleContent: "발매 1주년 기념",
    participant: [
      {
        pk: 1,
        idol_name: "청하",
        idol_group: "GirlGroup",
        idol_solo: "GirlSolo",
        idol_profile: "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
      },
    ],
  },
  {
    pk: 2,
    ScheduleTitle: "test1",
    ScheduleType: {
      type: "event",
      content: "test",
    },
    location: "서울",
    when: "2023-03-20T10:36:05+09:00",
    ScheduleContent: "발매 1주년 기념",
    participant: [
      {
        pk: 1,
        idol_name: "청하",
        idol_group: "GirlGroup",
        idol_solo: "GirlSolo",
        idol_profile: "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
      },
    ],
  },
  {
    pk: 3,
    ScheduleTitle: "test1",
    ScheduleType: {
      type: "congrats",
      content: "test",
    },
    location: "서울",
    when: "2023-03-20T10:36:05+09:00",
    ScheduleContent: "발매 1주년 기념",
    participant: [
      {
        pk: 1,
        idol_name: "청하",
        idol_group: "GirlGroup",
        idol_solo: "GirlSolo",
        idol_profile: "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
      },
    ],
  },
  {
    pk: 4,
    ScheduleTitle: "test1",
    ScheduleType: {
      type: "congrats",
      content: "test",
    },
    location: "서울",
    when: "2023-03-20T10:36:05+09:00",
    ScheduleContent: "발매 1주년 기념",
    participant: [
      {
        pk: 1,
        idol_name: "청하",
        idol_group: "GirlGroup",
        idol_solo: "GirlSolo",
        idol_profile: "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
      },
    ],
  },
  {
    pk: 5,
    ScheduleTitle: "test1",
    ScheduleType: {
      type: "event",
      content: "test",
    },
    location: "서울",
    when: "2023-03-20T10:36:05+09:00",
    ScheduleContent: "발매 1주년 기념",
    participant: [
      {
        pk: 1,
        idol_name: "청하",
        idol_group: "GirlGroup",
        idol_solo: "GirlSolo",
        idol_profile: "https://newsimg.sedaily.com/2022/08/26/269Y4OKML1_1.jpg",
      },
    ],
  },
];

function Category() {
  const types = [...new Set(category.map((item) => item.ScheduleType.type))];

  const buttons = [
    { id: 1, type: "A", content: "Button 1 (Type A)" },
    { id: 2, type: "B", content: "Button 2 (Type B)" },
    { id: 3, type: "A", content: "Button 3 (Type A)" },
    { id: 4, type: "B", content: "Button 4 (Type B)" },
  ];

  const [activeButtons, setActiveButtons] = useState([1, 2, 3, 4]);
  const ids = buttons.map((item) => item.id);

  const handleClick = (buttonId) => {
    // include -> 배열이 valueToFind 값을 포함하고 있는지의 여부(boolean)
    if (activeButtons.length === 1 && activeButtons.includes(buttonId)) {
      return; // 현재 활성화된 버튼 하나를 클릭한 경우, 더 이상 수정하지 않음
    }

    // handleClick 함수는 클릭된 버튼의 ID를 배열에 추가하거나 삭제
    // map 함수에서 각 버튼의 className 속성은 activeButtons 배열에 현재 버튼의 ID가 포함되어 있는 경우에는 active 클래스를, 아닌 경우에는 inactive 클래스를 적용
    const index = activeButtons.indexOf(buttonId);
    // indexOf -> 검색된 문자열이 '첫번째'로 나타나는 위치 index를 리턴, 없을경우 -1

    if (index === -1) {
      setActiveButtons([...activeButtons, buttonId]);
    } else {
      setActiveButtons([
        ...activeButtons.slice(0, index),
        ...activeButtons.slice(index + 1),
      ]);
    }
  };

  return (
    <div>
      {buttons.map((button) => {
        return (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            className={
              activeButtons.includes(button.id) ? "active" : "inactive"
            }
          >
            {button.content}
          </button>
        );
      })}
      <div className="data">
        <div>
          <h2>Data for Button {activeButtons}</h2>
          <div className="a">
            {types.map((item) => (
              <div className="b">{item.data}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
