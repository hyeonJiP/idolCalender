import React, { useState } from "react";
import "./test.css";

const schedule = [
  {
    date: "20230320",
    title: "test1",
    content: "발매 1주년 기념",
    category: "broadcast",
  },
  {
    date: "20230321",
    title: "test2",
    content: "발매 2주년 기념",
    category: "event",
  },
  {
    date: "20230323",
    title: "aaaa",
    content: "발매 3주년 기념",
    category: "congrats",
  },
  {
    date: "20230320",
    title: "test3",
    content: "발매 3주년 기념",
    category: "congrats",
  },
  {
    date: "20230321",
    title: "test4",
    content: "발매 5주년 기념",
    category: "congrats",
  },
  {
    date: "20230322",
    title: "test5",
    content: "발매 6주년 기념",
    category: "event",
  },
];

const FilterableProductTable = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isShown, setIsShown] = useState(true);

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsShown(!isShown);
  };

  const types = [...new Set(schedule.map((item) => item.category))];
  //console.log(types);
  return (
    <div>
      {types.map((type, index) => (
        <button onClick={() => handleClick(index)} key={index}>
          {type}
        </button>
      ))}

      <div className="circleDiv">
        {/* <ul>
          {filteredProduct.map((product) => (
            <li key={product.title}>{product.data}</li>
          ))}
        </ul> */}
      </div>
      {types.map((type, index) => (
        <div key={index} className="testDiv">
          {schedule
            .filter((item) => item.category === type)
            .map((item, index) => (
              <div
                key={index}
                className={item.category}
                style={{
                  display: activeIndex === index || isShown ? "block" : "none",
                }}
                // style={{ display: isShown ? "block" : "none" }}
              >
                {item.data}
              </div>
            ))}
        </div>
      ))}

      {/* <label>
        Filter by category:
        <select value={filterCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="smartphone">Smartphones</option>
          <option value="tablet">Tablets</option>
        </select>
      </label>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
      <div>
        {categoryVisibility.smartphone && (
          <button onClick={() => setFilterCategory("smartphone")}>
            Show only smartphones
          </button>
        )}
        {categoryVisibility.tablet && (
          <button onClick={() => setFilterCategory("tablet")}>
            Show only tablets
          </button>
        )}
        {filterCategory !== "all" && (
          <button onClick={() => setFilterCategory("all")}>
            Show all products
          </button>
        )}
      </div> */}
    </div>
  );
};

export default FilterableProductTable;
