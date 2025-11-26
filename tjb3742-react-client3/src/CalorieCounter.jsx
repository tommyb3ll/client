import React from 'react';

const CalorieCounter = ({ totalCalories }) => {
  return (
    <div className="summary">
      <h3>Total Calories: <span id="totalCalories">{totalCalories}</span></h3>
    </div>
  );
};

export default CalorieCounter;
