import React, { useState } from "react";

function Test() {
  const data = [
    { category: "fruit", name: "Apple" },
    { category: "fruit", name: "Banana" },
    { category: "vegetable", name: "Carrot" },
    { category: "vegetable", name: "Potato" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index} onClick={() => handleCategoryClick(item.category)}>
            {item.category}
          </li>
        ))}
      </ul>
      <div>
        {data.map(
          (item, index) =>
            item.category === selectedCategory && (
              <div key={index}>
                <h3>{item.name}</h3>
              </div>
            )
        )}
      </div>
    </div>
  );
}
export default Test;
