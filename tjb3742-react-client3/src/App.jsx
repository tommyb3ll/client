import { useState } from 'react';
import { 
  Container, Row, Col, Card, CardBody, Button, 
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Progress
} from 'reactstrap';
import './App.css';
import { foodData, categoryNames } from './foodData';
import NutritionLabel from './NutritionLabel';
import FoodItemModal from './FoodItemModal';
import CalorieGoalModal from './CalorieGoalModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [availableItems, setAvailableItems] = useState(foodData);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingNutrition, setViewingNutrition] = useState(null);
  const [nextId, setNextId] = useState(26);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentItem(null);
  };

  const handleSelectItem = (item) => {
    setCurrentItem(item);
    setViewingNutrition(item);
  };

  const handleAddItem = () => {
    if (!currentItem) return;
    
    setSelectedItems([...selectedItems, currentItem]);
    setCurrentItem(null);
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter(item => 
      !(item.id === itemToRemove.id && item.name === itemToRemove.name)
    ));
    if (currentItem && currentItem.id === itemToRemove.id) {
      setCurrentItem(null);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleSaveEdit = (formData) => {
    const updatedAvailableItems = { ...availableItems };
    const category = formData.category;
    
    if (updatedAvailableItems[category]) {
      const itemIndex = updatedAvailableItems[category].findIndex(
        i => i.id === editingItem.id
      );
      
      if (itemIndex !== -1) {
        updatedAvailableItems[category][itemIndex] = {
          ...editingItem,
          ...formData
        };
        setAvailableItems(updatedAvailableItems);
        
        // Update selected items if the edited item is there
        const updatedSelectedItems = selectedItems.map(item =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        );
        setSelectedItems(updatedSelectedItems);
        
        // Update viewing nutrition if this item is being viewed
        if (viewingNutrition && viewingNutrition.id === editingItem.id) {
          setViewingNutrition({ ...viewingNutrition, ...formData });
        }
      }
    }
    
    setEditingItem(null);
  };

  const handleAddNewItem = (formData) => {
    const updatedAvailableItems = { ...availableItems };
    const category = selectedCategory;
    
    if (updatedAvailableItems[category]) {
      const newItem = {
        id: nextId,
        ...formData,
        category
      };
      
      updatedAvailableItems[category] = [
        ...updatedAvailableItems[category],
        newItem
      ];
      
      setAvailableItems(updatedAvailableItems);
      setNextId(nextId + 1);
    }
  };

  const calculateTotals = () => {
    return selectedItems.reduce((totals, item) => ({
      calories: totals.calories + item.calories,
      totalFat: totals.totalFat + item.totalFat,
      saturatedFat: totals.saturatedFat + item.saturatedFat,
      transFat: totals.transFat + item.transFat,
      protein: totals.protein + item.protein,
      carbohydrate: totals.carbohydrate + item.carbohydrate
    }), {
      name: 'Total',
      calories: 0,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      protein: 0,
      carbohydrate: 0
    });
  };

  const currentAvailableItems = selectedCategory ? availableItems[selectedCategory] : [];
  const categories = Object.keys(availableItems);
  const totals = calculateTotals();
  const progressPercentage = Math.min((totals.calories / calorieGoal) * 100, 100);
  const progressColor = progressPercentage < 50 ? 'success' : progressPercentage < 80 ? 'warning' : 'danger';

  return (
    <Container fluid className="app-container">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mt-3">NutriKit Food Planner</h1>
          <p className="text-center lead">
            NutriKit allows you to select your groceries and track your nutritional progress
          </p>
        </Col>
      </Row>

      {/* Category Selector */}
      <Row className="mb-3">
        <Col xs={12} md={6} className="mx-auto text-center">
          <UncontrolledDropdown>
            <DropdownToggle caret color="primary" size="lg" className="w-100">
              {selectedCategory ? categoryNames[selectedCategory] : 'Select a Category'}
            </DropdownToggle>
            <DropdownMenu className="w-100">
              {categories.map(category => (
                <DropdownItem 
                  key={category} 
                  onClick={() => handleCategoryChange(category)}
                  style={{ fontSize: '1.1rem', padding: '12px 20px' }}
                >
                  {categoryNames[category]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
      </Row>

      {/* Main Content Area */}
      <Row className="g-3">
        {/* Available Items */}
        <Col xs={12} lg={4}>
          <Card>
            <CardBody>
              <h5>Available Items</h5>
              {selectedCategory && (
                <Button 
                  color="success" 
                  size="sm" 
                  className="mb-2 w-100"
                  onClick={() => setShowAddModal(true)}
                  style={{ fontSize: '1rem', padding: '10px' }}
                >
                  + Add New Item to {categoryNames[selectedCategory]}
                </Button>
              )}
              <div className="food-list-container">
                {currentAvailableItems.map((item) => (
                  <Card 
                    key={item.id}
                    className={`food-item ${currentItem?.id === item.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(item)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                  >
                    <CardBody className="p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>{item.name}</strong>
                          <div style={{ fontSize: '0.9rem' }}>{item.calories} cal</div>
                        </div>
                        <div>
                          <Button 
                            color="info" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(item);
                            }}
                            style={{ minWidth: '60px', fontSize: '0.9rem' }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                {currentAvailableItems.length === 0 && (
                  <p className="text-muted">Select a category to view items</p>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Control Buttons */}
        <Col xs={12} lg={4} className="d-flex flex-column align-items-center justify-content-center">
          <Button 
            color="primary" 
            size="lg" 
            onClick={handleAddItem}
            disabled={!currentItem}
            className="mb-3 w-100"
            style={{ fontSize: '1.2rem', padding: '15px', maxWidth: '300px' }}
          >
            Add →
          </Button>
          
          {viewingNutrition && (
            <div className="w-100" style={{ maxWidth: '400px' }}>
              <NutritionLabel item={viewingNutrition} />
            </div>
          )}
        </Col>

        {/* Selected Items */}
        <Col xs={12} lg={4}>
          <Card>
            <CardBody>
              <h5>My Selections</h5>
              <div className="food-list-container" style={{ minHeight: '300px' }}>
                {selectedItems.map((item, index) => (
                  <Card 
                    key={`${item.id}-${index}`}
                    className="food-item"
                    style={{ marginBottom: '10px' }}
                  >
                    <CardBody className="p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div onClick={() => handleSelectItem(item)} style={{ cursor: 'pointer', flex: 1 }}>
                          <strong style={{ fontSize: '1.1rem' }}>{item.name}</strong>
                          <div style={{ fontSize: '0.9rem' }}>{item.calories} cal</div>
                        </div>
                        <Button 
                          color="danger" 
                          size="sm"
                          onClick={() => handleRemoveItem(item)}
                          style={{ minWidth: '80px', fontSize: '0.9rem' }}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                {selectedItems.length === 0 && (
                  <p className="text-muted">No items selected yet</p>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Calorie Goal and Progress */}
      <Row className="mt-4">
        <Col xs={12} md={8} className="mx-auto">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Daily Calorie Goal</h5>
                <Button 
                  color="primary" 
                  size="sm"
                  onClick={() => setShowGoalModal(true)}
                  style={{ minWidth: '80px' }}
                >
                  Edit Goal
                </Button>
              </div>
              <div className="mb-2">
                <h6 className="text-center">
                  {totals.calories} / {calorieGoal} calories
                </h6>
              </div>
              <Progress 
                value={progressPercentage} 
                color={progressColor}
                style={{ height: '30px', fontSize: '1.1rem' }}
              >
                {Math.round(progressPercentage)}%
              </Progress>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Total Nutrition Label */}
      {selectedItems.length > 0 && (
        <Row className="mt-4 mb-4">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <NutritionLabel item={totals} isTotal={true} />
          </Col>
        </Row>
      )}

      {/* Modals */}
      <FoodItemModal
        isOpen={showEditModal}
        toggle={() => setShowEditModal(false)}
        item={editingItem}
        onSave={handleSaveEdit}
        isEdit={true}
        category={editingItem?.category}
      />

      <FoodItemModal
        isOpen={showAddModal}
        toggle={() => setShowAddModal(false)}
        item={null}
        onSave={handleAddNewItem}
        isEdit={false}
        category={selectedCategory}
      />

      <CalorieGoalModal
        isOpen={showGoalModal}
        toggle={() => setShowGoalModal(false)}
        currentGoal={calorieGoal}
        onSave={setCalorieGoal}
      />
    </Container>
  );
}

export default App;
