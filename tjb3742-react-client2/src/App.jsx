import { useState } from 'react';
import './App.css';
import CategorySelector from './CategorySelector';
import FoodList from './FoodList';
import Controls from './Controls';
import CalorieCounter from './CalorieCounter';

const foodData = {
    proteins: [
        { name: 'steak', calories: 300, category: 'proteins' },
        { name: 'ground beef', calories: 200, category: 'proteins' },
        { name: 'chicken', calories: 100, category: 'proteins' },
        { name: 'fish', calories: 80, category: 'proteins' },
        { name: 'soy', calories: 50, category: 'proteins' }
    ],
    fruits: [
        { name: 'orange', calories: 300, category: 'fruits' },
        { name: 'banana', calories: 200, category: 'fruits' },
        { name: 'pineapple', calories: 100, category: 'fruits' },
        { name: 'grapes', calories: 80, category: 'fruits' },
        { name: 'blueberries', calories: 50, category: 'fruits' }
    ],
    vegetables: [
        { name: 'romaine', calories: 30, category: 'vegetables' },
        { name: 'green beans', calories: 40, category: 'vegetables' },
        { name: 'squash', calories: 100, category: 'vegetables' },
        { name: 'spinach', calories: 50, category: 'vegetables' },
        { name: 'kale', calories: 10, category: 'vegetables' }
    ],
    dairy: [
        { name: 'milk', calories: 300, category: 'dairy' },
        { name: 'yoghurt', calories: 200, category: 'dairy' },
        { name: 'cheddar cheese', calories: 200, category: 'dairy' },
        { name: 'skim milk', calories: 100, category: 'dairy' },
        { name: 'cottage cheese', calories: 80, category: 'dairy' }
    ],
    grains: [
        { name: 'bread', calories: 200, category: 'grains' },
        { name: 'bagel', calories: 300, category: 'grains' },
        { name: 'pita', calories: 250, category: 'grains' },
        { name: 'naan', calories: 210, category: 'grains' },
        { name: 'tortilla', calories: 120, category: 'grains' }
    ]
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null); // { item: {}, list: '' }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentItem(null); // Clear selection when category changes
  };

  const handleSelectItem = (item, listName) => {
    setCurrentItem({ item, list: listName });
  };

  const handleAddRemove = () => {
    if (!currentItem) return;

    if (currentItem.list === 'available') {
      setSelectedItems([...selectedItems, currentItem.item]);
    } else if (currentItem.list === 'selected') {
      setSelectedItems(selectedItems.filter(item => item.name !== currentItem.item.name));
    }
    setCurrentItem(null); // Clear selection after move
  };
  
  const calculateTotalCalories = () => {
    return selectedItems.reduce((total, item) => total + item.calories, 0);
  };

  const availableItems = selectedCategory ? foodData[selectedCategory] : [];
  const categories = Object.keys(foodData);
  
  let buttonText = '<-- -->';
  if (currentItem) {
    buttonText = currentItem.list === 'available' ? 'Add -->' : '<-- Remove';
  }

  return (
    <div className="container">
      <h1>NutriKit Food Planner</h1>
      <h3>NutriKit allows you to select your groceries, and track your nutritional progress (good or bad)</h3>

      <CategorySelector 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="list-container">
        <FoodList 
          title="Available Items"
          items={availableItems}
          onSelectItem={(item) => handleSelectItem(item, 'available')}
          size={5}
        />
        <Controls onAddRemove={handleAddRemove} buttonText={buttonText} />
        <FoodList 
          title="My Selections"
          items={selectedItems}
          onSelectItem={(item) => handleSelectItem(item, 'selected')}
          size={10}
        />
      </div>

      <CalorieCounter totalCalories={calculateTotalCalories()} />
    </div>
  );
}

export default App;
