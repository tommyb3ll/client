import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <FormGroup>
      <Label for="categorySelect" className="h5">Select Food Category</Label>
      <Input 
        type="select" 
        id="categorySelect" 
        value={selectedCategory} 
        onChange={onCategoryChange}
        bsSize="lg"
      >
        <option value="">-- Choose a category --</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default CategorySelector;
