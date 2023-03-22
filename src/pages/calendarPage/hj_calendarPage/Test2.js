import React, { useState } from "react";

const Test2 = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const data = [
    { id: 1, category: "food", name: "pizza" },
    { id: 2, category: "food", name: "hamburger" },
    { id: 3, category: "drink", name: "soda" },
    { id: 4, category: "drink", name: "water" },
  ];

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredData = data.filter((item) =>
    selectedCategories.includes(item.category)
  );

  return (
    <div>
      <h2>Categories:</h2>
      <button onClick={() => handleCategorySelect("food")}>
        Food ({selectedCategories.includes("food") ? "selected" : "unselected"})
      </button>
      <button onClick={() => handleCategorySelect("drink")}>
        Drink (
        {selectedCategories.includes("drink") ? "selected" : "unselected"})
      </button>
      <h2>Items:</h2>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test2;
