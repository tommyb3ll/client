import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="controls">
      <select id="categorySelect" value={selectedCategory} onChange={onCategoryChange}>
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
