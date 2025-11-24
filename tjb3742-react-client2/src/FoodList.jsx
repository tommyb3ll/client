import React from 'react';

const FoodList = ({ title, items, onSelectItem, size }) => {
  return (
    <div className="list-box-wrapper">
      <label>{title}</label>
      <select size={size} className="food-list">
        {items.map((item, index) => (
          <option key={`${item.name}-${index}`} onClick={() => onSelectItem(item)}>
            {item.name} ({item.calories} cal)
          </option>
        ))}
      </select>
    </div>
  );
};

export default FoodList;
