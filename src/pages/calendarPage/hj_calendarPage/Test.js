import React, { useState } from "react";
import styles from "./Test.module.scss";

const data = [
  { pk: 1, category: "broadcast", name: "pizza" },
  { pk: 2, category: "broadcast", name: "hamburger" },
  { pk: 3, category: "event", name: "soda" },
  { pk: 4, category: "release", name: "orange" },
  { pk: 5, category: "congratulations", name: "orange" },
  { pk: 6, category: "my", name: "orange" },
  { pk: 7, category: "buy", name: "orange" },
  { pk: 8, category: "my", name: "orange" },
];

// data라는 배열을 types 변수를 통해 이 배열의 category 속성 중 중복되지 않는 값을 가져온다
const types = [...new Set(data.map((item) => item.category))];
//console.log(types);

const buttons = [
  { pk: 1, type: "broadcast", content: "방송" },
  { pk: 2, type: "event", content: "행사" },
  { pk: 3, type: "release", content: "발매" },
  { pk: 4, type: "congratulations", content: "축하" },
  { pk: 5, type: "buy", content: "구매" },
  { pk: 6, type: "my", content: "My" },
];

const Test = () => {
  const [activeButtons, setActiveButtons] = useState([1, 2, 3, 4, 5, 6]);
  const pks = buttons.map((item) => item.pk);

  const handleClick = (buttonPk) => {
    //  선택된 버튼이 한 개 남은 경우에는 선택되어 있던 버튼을 취소할 수 없도록 처리
    // include -> 배열이 valueToFind 값을 포함하고 있는지의 여부(boolean)
    if (activeButtons.length === 1 && activeButtons.includes(buttonPk)) {
      return;
    }

    // map 함수에서 각 버튼의 className 속성은 activeButtons 배열에 현재 버튼의 ID가 포함되어 있는 경우에는 active 클래스를, 아닌 경우에는 inactive 클래스를 적용
    const index = activeButtons.indexOf(buttonPk);
    // indexOf -> 검색된 문자열이 '첫번째'로 나타나는 위치 index를 리턴, 없을경우 -1
    // activeButtons 배열에서 buttonId와 일치하는 값의 인덱스를 찾는다

    if (index === -1) {
      setActiveButtons([...activeButtons, buttonPk]);
    } else {
      setActiveButtons([
        ...activeButtons.slice(0, index),
        ...activeButtons.slice(index + 1),
      ]);
    }
  };
  // slice 메소드를 사용하여 buttonId 이전과 이후의 두 개의 배열을 연결
  // 이를 통해 buttonId가 있는 인덱스를 생략하여 activeButtons에서 해당 항목을 제거

  // filteredData 변수를 통해 선택된 버튼에 해당하는 data 배열의 요소를 필터링하여 출력
  const filteredData = data.filter((item) =>
    activeButtons.includes(
      buttons.find((button) => button.type === item.category).pk
    )
  );

  return (
    <div className={styles.container}>
      {buttons.map((button) => {
        return (
          <button
            key={button.pk}
            onClick={() => handleClick(button.pk)}
            className={`${
              activeButtons.includes(button.pk)
                ? styles.active
                : styles.inactive
            } 
             ${styles.buttonss}
            `}
          >
            {button.content}
            {/* ({activeButtons.includes(button.pk) ? "selected" : "unselected"}) */}
          </button>
        );
      })}
      <ul className={styles.testDiv}>
        {filteredData.map((item) => (
          <li
            key={item.pk}
            className={`${styles.listItem} ${styles[item.category]}`}
          >
            {item.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
