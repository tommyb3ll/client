import { useState } from 'react';
import { Container, Row, Col, Button, Progress } from 'reactstrap';
import './App.css';
import CategorySelector from './CategorySelector';
import FoodList from './FoodList';
import NutritionLabel from './NutritionLabel';
import EditFoodModal from './EditFoodModal';
import AddFoodModal from './AddFoodModal';
import CalorieGoalModal from './CalorieGoalModal';

const initialFoodData = {
    proteins: [
        { name: 'steak', calories: 300, totalFat: 20, saturatedFat: 8, transFat: 0.5, protein: 26, carbs: 0, category: 'proteins' },
        { name: 'ground beef', calories: 200, totalFat: 15, saturatedFat: 6, transFat: 0.3, protein: 18, carbs: 0, category: 'proteins' },
        { name: 'chicken', calories: 100, totalFat: 3, saturatedFat: 1, transFat: 0, protein: 18, carbs: 0, category: 'proteins' },
        { name: 'fish', calories: 80, totalFat: 2, saturatedFat: 0.5, transFat: 0, protein: 17, carbs: 0, category: 'proteins' },
        { name: 'soy', calories: 50, totalFat: 2, saturatedFat: 0.3, transFat: 0, protein: 8, carbs: 4, category: 'proteins' }
    ],
    fruits: [
        { name: 'orange', calories: 300, totalFat: 0.5, saturatedFat: 0, transFat: 0, protein: 2, carbs: 75, category: 'fruits' },
        { name: 'banana', calories: 200, totalFat: 0.4, saturatedFat: 0.1, transFat: 0, protein: 2, carbs: 51, category: 'fruits' },
        { name: 'pineapple', calories: 100, totalFat: 0.2, saturatedFat: 0, transFat: 0, protein: 1, carbs: 26, category: 'fruits' },
        { name: 'grapes', calories: 80, totalFat: 0.2, saturatedFat: 0, transFat: 0, protein: 0.8, carbs: 20, category: 'fruits' },
        { name: 'blueberries', calories: 50, totalFat: 0.3, saturatedFat: 0, transFat: 0, protein: 0.7, carbs: 12, category: 'fruits' }
    ],
    vegetables: [
        { name: 'romaine', calories: 30, totalFat: 0.3, saturatedFat: 0, transFat: 0, protein: 2, carbs: 5, category: 'vegetables' },
        { name: 'green beans', calories: 40, totalFat: 0.2, saturatedFat: 0, transFat: 0, protein: 2, carbs: 8, category: 'vegetables' },
        { name: 'squash', calories: 100, totalFat: 0.5, saturatedFat: 0.1, transFat: 0, protein: 2, carbs: 24, category: 'vegetables' },
        { name: 'spinach', calories: 50, totalFat: 0.4, saturatedFat: 0.1, transFat: 0, protein: 5, carbs: 7, category: 'vegetables' },
        { name: 'kale', calories: 10, totalFat: 0.2, saturatedFat: 0, transFat: 0, protein: 1, carbs: 2, category: 'vegetables' }
    ],
    dairy: [
        { name: 'milk', calories: 300, totalFat: 16, saturatedFat: 10, transFat: 0.5, protein: 16, carbs: 24, category: 'dairy' },
        { name: 'yoghurt', calories: 200, totalFat: 8, saturatedFat: 5, transFat: 0, protein: 12, carbs: 17, category: 'dairy' },
        { name: 'cheddar cheese', calories: 200, totalFat: 16, saturatedFat: 10, transFat: 0.5, protein: 14, carbs: 2, category: 'dairy' },
        { name: 'skim milk', calories: 100, totalFat: 0.2, saturatedFat: 0.1, transFat: 0, protein: 10, carbs: 15, category: 'dairy' },
        { name: 'cottage cheese', calories: 80, totalFat: 2, saturatedFat: 1, transFat: 0, protein: 14, carbs: 3, category: 'dairy' }
    ],
    grains: [
        { name: 'bread', calories: 200, totalFat: 3, saturatedFat: 0.5, transFat: 0, protein: 7, carbs: 38, category: 'grains' },
        { name: 'bagel', calories: 300, totalFat: 2, saturatedFat: 0.3, transFat: 0, protein: 11, carbs: 59, category: 'grains' },
        { name: 'pita', calories: 250, totalFat: 1.5, saturatedFat: 0.2, transFat: 0, protein: 9, carbs: 52, category: 'grains' },
        { name: 'naan', calories: 210, totalFat: 5, saturatedFat: 1, transFat: 0, protein: 6, carbs: 38, category: 'grains' },
        { name: 'tortilla', calories: 120, totalFat: 3, saturatedFat: 0.5, transFat: 0, protein: 3, carbs: 20, category: 'grains' }
    ]
};

function App() {
  const [foodData, setFoodData] = useState(initialFoodData);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAvailableItem, setSelectedAvailableItem] = useState(null);
  const [selectedMyItem, setSelectedMyItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedAvailableItem(null);
  };

  const handleAdd = () => {
    if (!selectedAvailableItem) return;
    setSelectedItems([...selectedItems, selectedAvailableItem]);
    setSelectedAvailableItem(null);
  };

  const handleRemove = () => {
    if (!selectedMyItem) return;
    setSelectedItems(selectedItems.filter(item => 
      !(item.name === selectedMyItem.name && item.category === selectedMyItem.category)
    ));
    setSelectedMyItem(null);
  };

  const handleEditItem = (updatedItem) => {
    // Update in foodData
    const newFoodData = { ...foodData };
    const categoryItems = newFoodData[updatedItem.category];
    const itemIndex = categoryItems.findIndex(item => item.name === updatedItem.name);
    if (itemIndex !== -1) {
      categoryItems[itemIndex] = updatedItem;
      setFoodData(newFoodData);
    }
    
    // Update in selectedItems if present
    const selectedIndex = selectedItems.findIndex(item => 
      item.name === updatedItem.name && item.category === updatedItem.category
    );
    if (selectedIndex !== -1) {
      const newSelectedItems = [...selectedItems];
      newSelectedItems[selectedIndex] = updatedItem;
      setSelectedItems(newSelectedItems);
    }
    
    setEditModalOpen(false);
  };

  const handleAddNewItem = (newItem) => {
    const newFoodData = { ...foodData };
    newFoodData[newItem.category] = [...newFoodData[newItem.category], newItem];
    setFoodData(newFoodData);
    setAddModalOpen(false);
  };

  const calculateTotals = (items) => {
    return items.reduce((totals, item) => ({
      calories: totals.calories + item.calories,
      totalFat: totals.totalFat + item.totalFat,
      saturatedFat: totals.saturatedFat + item.saturatedFat,
      transFat: totals.transFat + item.transFat,
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs
    }), { calories: 0, totalFat: 0, saturatedFat: 0, transFat: 0, protein: 0, carbs: 0 });
  };

  const availableItems = selectedCategory ? foodData[selectedCategory] : [];
  const categories = Object.keys(foodData);
  const totalNutrition = calculateTotals(selectedItems);
  const calorieProgress = calorieGoal > 0 ? Math.min((totalNutrition.calories / calorieGoal) * 100, 100) : 0;

  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col>
          <h1 className="text-center">NutriKit Food Planner</h1>
          <p className="text-center text-muted">
            Select your groceries and track your nutritional progress
          </p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <CategorySelector 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={5} sm={12} className="mb-3 mb-md-0">
          <FoodList 
            title="Available Items"
            items={availableItems}
            selectedItem={selectedAvailableItem}
            onSelectItem={setSelectedAvailableItem}
          />
          <div className="d-flex justify-content-between mt-2">
            <Button 
              color="primary" 
              onClick={handleAdd}
              disabled={!selectedAvailableItem}
              size="lg"
              className="flex-grow-1 me-1"
            >
              Add →
            </Button>
            <Button 
              color="info" 
              onClick={() => setAddModalOpen(true)}
              disabled={!selectedCategory}
              size="lg"
              className="flex-grow-1 ms-1"
            >
              New Item
            </Button>
          </div>
        </Col>
        
        <Col md={7} sm={12}>
          <FoodList 
            title="My Selections"
            items={selectedItems}
            selectedItem={selectedMyItem}
            onSelectItem={setSelectedMyItem}
          />
          <div className="d-flex justify-content-between mt-2">
            <Button 
              color="danger" 
              onClick={handleRemove}
              disabled={!selectedMyItem}
              size="lg"
              className="flex-grow-1 me-1"
            >
              ← Remove
            </Button>
            <Button 
              color="warning" 
              onClick={() => setEditModalOpen(true)}
              disabled={!selectedMyItem}
              size="lg"
              className="flex-grow-1 ms-1"
            >
              Edit
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6} sm={12} className="mb-3 mb-md-0">
          <h4>Selected Item Nutrition</h4>
          <NutritionLabel item={selectedMyItem || selectedAvailableItem} />
        </Col>
        <Col md={6} sm={12}>
          <h4>Total Nutrition</h4>
          <NutritionLabel item={totalNutrition} isTotal={true} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0">Calorie Goal Progress</h4>
            <Button 
              color="secondary" 
              size="sm"
              onClick={() => setGoalModalOpen(true)}
            >
              Edit Goal
            </Button>
          </div>
          <Progress 
            value={calorieProgress} 
            color={calorieProgress > 90 ? 'danger' : calorieProgress > 70 ? 'warning' : 'success'}
            style={{ height: '30px' }}
          >
            {totalNutrition.calories} / {calorieGoal} cal ({Math.round(calorieProgress)}%)
          </Progress>
        </Col>
      </Row>

      <EditFoodModal 
        isOpen={editModalOpen}
        toggle={() => setEditModalOpen(!editModalOpen)}
        item={selectedMyItem}
        onSave={handleEditItem}
      />

      <AddFoodModal 
        isOpen={addModalOpen}
        toggle={() => setAddModalOpen(!addModalOpen)}
        category={selectedCategory}
        onAdd={handleAddNewItem}
      />

      <CalorieGoalModal 
        isOpen={goalModalOpen}
        toggle={() => setGoalModalOpen(!goalModalOpen)}
        currentGoal={calorieGoal}
        onSave={setCalorieGoal}
      />
    </Container>
  );
}

export default App;
