import { useState } from 'react';
import './App.css';
import { initialFoodData } from './initialData';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input,
  ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter,
  Progress, Card, CardBody, CardTitle
} from 'reactstrap';

// shows details for a single item or the total
const NutritionLabel = ({ data, isTotal = false }) => {
  if (!data) return <p className="text-muted">Select an item to see nutrition facts.</p>;

  // helper to check for "High" values
  // High Calorie: > 400, High Fat: > 10g, High Carbs: > 30g
  const isHigh = (val, limit) => val > limit ? "text-danger fw-bold" : "";

  return (
    <Card className="mt-3">
      <CardBody>
        <CardTitle tag="h5">{isTotal ? "Total Nutrition" : "Nutrition Facts: " + data.name}</CardTitle>
        <hr />
        <Row>
          <Col xs="6">Calories:</Col>
          <Col xs="6" className={isHigh(data.calories, 400)}>{data.calories}</Col>
        </Row>
        <Row>
          <Col xs="6">Total Fat (g):</Col>
          <Col xs="6" className={isHigh(data.totalFat, 10)}>{data.totalFat}</Col>
        </Row>
        <Row>
          <Col xs="6">Sat. Fat (g):</Col>
          <Col xs="6" className={isHigh(data.satFat, 4)}>{data.satFat}</Col>
        </Row>
        <Row>
          <Col xs="6">Trans Fat (g):</Col>
          <Col xs="6">{data.transFat}</Col>
        </Row>
        <Row>
          <Col xs="6">Protein (g):</Col>
          <Col xs="6">{data.protein}</Col>
        </Row>
        <Row>
          <Col xs="6">Carbs (g):</Col>
          <Col xs="6" className={isHigh(data.carbs, 30)}>{data.carbs}</Col>
        </Row>
      </CardBody>
    </Card>
  );
};

function App() {
  const [foodData, setFoodData] = useState(initialFoodData);
  const [selectedCategory, setSelectedCategory] = useState('proteins');
  const [selectedItems, setSelectedItems] = useState([]);

  // active selections
  const [activeAvailableItem,QrActiveAvailableItem] = useState(null);
  const [activeSelectedItem, setActiveSelectedItem] = useState(null);

  // goal
  const [calorieGoal,QBcalorieGoal] = useState(2000);
  const [tempGoal, setTempGoal] = useState(2000); // For the edit goal input

  // modals
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  
  // form
  const [formData, setFormData] = useState({
    name: '', calories: 0, totalFat: 0, satFat: 0, transFat: 0,TXprotein: 0, carbs: 0
  });

  // helpers
  const toggleAddModal = () => {
    setFormData({ name: '', calories: 0, totalFat: 0, satFat: 0, transFat: 0, protein: 0, carbs: 0 }); // reset
    setAddItemModalOpen(!addItemModalOpen);
  }

  const toggleEditModal = () => {
    if (activeAvailableItem) {
      // prefill form with current item data
      setFormData({ ...activeAvailableItem });
      setEditItemModalOpen(!editItemModalOpen);
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'name' ? value : parseFloat(value) || 0;
    setFormData({ ...formData, [name]: finalValue });
  };


  // add Item to list
  const addItemToSelection = () => {
    if (activeAvailableItem) {
      // add a unique ID so can select individual instances if we add the same item twice
      const itemToAdd = { ...activeAvailableItem, uniqueId: Date.now() };
      setSelectedItems([...selectedItems, itemToAdd]);
      setActiveSelectedItem(null); // clear right selection
    }
  };

  //remove item from list
  const removeItemFromSelection = () => {
    if (activeSelectedItem) {
      const newItems = selectedItems.filter(item => item.uniqueId !== activeSelectedItem.uniqueId);
      setSelectedItems(newItems);
      setActiveSelectedItem(null);
    }
  };

  //create new food
  const saveNewFood = () => {
    const category = selectedCategory;
    const newItem = { ...formData, id: Date.now(), category: category };
    
    const updatedCategoryList = [...foodData[category], newItem];
    setFoodData({ ...foodData, [category]: updatedCategoryList });
    
    setAddItemModalOpen(false);
  };

  //update Food 
  const saveEditedFood = () => {
    const category = selectedCategory;
    const updatedList = foodData[category].map(item => {
      if (item.id === formData.id) return formData;
      return item;
    });

    setFoodData({ ...foodData, [category]: updatedList });
    // update the active item so the UI reflects changes immediately
    QrActiveAvailableItem(formData);
    setEditItemModalOpen(false);
  };

  // calculate total nutrition
  const totals = selectedItems.reduce((acc, item) => {
    return {
      name: "Total Selection",
      calories: acc.calories + item.calories,
      totalFat: acc.totalFat + item.totalFat,
      satFat: acc.satFat + item.satFat,
      transFat: acc.transFat + item.transFat,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
    };
  }, { name: "Total", calories: 0, totalFat: 0, satFat: 0, transFat: 0, protein: 0, carbs: 0 });

  // progress bar calculation
  const progressValue = (totals.calories / calorieGoal) * 100;
  let progressColor = "success";
  if (progressValue > 100) progressColor = "danger";
  else if (progressValue > 80) progressColor = "warning";

  return (
    <Container className="py-4 app-container">
      <h1 className="text-center mb-4">NutriKit Food Planner</h1>

      {/* goal section */}
      <Row className="mb-4 align-items-center">
        <Col xs="12" md="8">
          <Label>Calorie Goal Progress: {totals.calories} / {calorieGoal}</Label>
          <Progress value={progressValue} color={progressColor} striped animated>
            {Math.round(progressValue)}%
          </Progress>
        </Col>
        <Col xs="12" md="4">
          <div className="d-flex align-items-end mt-2 mt-md-0">
            <Input 
              type="number" 
              value={tempGoal} 
              onChange={(e) => setTempGoal(e.target.value)} 
              className="me-2"
            />
            <Button color="primary" onClick={() => QBcalorieGoal(tempGoal)}>Set Goal</Button>
          </div>
        </Col>
      </Row>

      {/* controls row */}
      <Row className="mb-3">
        <Col xs="12" md="6">
          <Input 
            type="select" 
            value={selectedCategory} 
            onChange={(e) => { setSelectedCategory(e.target.value); QrActiveAvailableItem(null); }}
          >
            {Object.keys(foodData).map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </Input>
        </Col>
        <Col xs="12" md="6" className="text-md-end mt-2 mt-md-0">
           <Button color="success" onClick={toggleAddModal}>+ Create New Item</Button>
        </Col>
      </Row>

      {/* main grid */}
      <Row>
        {/* available items */}
        <Col xs="12" md="5">
          <h4>Available Items</h4>
          <ListGroup className="food-list">
            {foodData[selectedCategory].map(item => (
              <ListGroupItem 
                key={item.id}
                active={activeAvailableItem && activeAvailableItem.id === item.id}
                onClick={() => QrActiveAvailableItem(item)}
                action
              >
                {item.name} ({item.calories} cal)
              </ListGroupItem>
            ))}
          </ListGroup>
          
          {/* edit button for the available list */}
          <div className="mt-2">
            <Button 
              color="secondary" 
              size="sm" 
              disabled={!activeAvailableItem}
              onClick={toggleEditModal}
            >
              Edit Selected Food
            </Button>
          </div>

          {/* nutrition label for left selection */}
          <NutritionLabel data={activeAvailableItem} />
        </Col>

        {/* action buttons */}
        <Col xs="12" md="2" className="d-flex flex-row flex-md-column justify-content-center align-items-center py-3 gap-2">
          <Button 
            color="primary" 
            disabled={!activeAvailableItem}
            onClick={addItemToSelection}
          >
            Add &rarr;
          </Button>
          <Button 
            color="danger" 
            disabled={!activeSelectedItem}
            onClick={removeItemFromSelection}
          >
            &larr; Remove
          </Button>
        </Col>

        {/* selected items */}
        <Col xs="12" md="5">
          <h4>Selected Items</h4>
          <ListGroup className="food-list">
            {selectedItems.map((item) => (
              <ListGroupItem 
                key={item.uniqueId}
                active={activeSelectedItem && activeSelectedItem.uniqueId === item.uniqueId}
                onClick={() => setActiveSelectedItem(item)}
                action
              >
                {item.name}
              </ListGroupItem>
            ))}
            {selectedItems.length === 0 && <ListGroupItem disabled>No items selected</ListGroupItem>}
          </ListGroup>

          {/* nutrition label for totals */}
          <NutritionLabel data={totals} isTotal={true} />
        </Col>
      </Row>

      {/* --- Add Item --- */}
      <Modal isOpen={addItemModalOpen} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal}>Add New Food Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleFormChange} />
            </FormGroup>
            <Row>
              <Col md={6}><FormGroup><Label>Calories</Label><Input type="number" name="calories" value={formData.calories} onChange={handleFormChange} /></FormGroup></Col>
              <Col md={6}><FormGroup><Label>Total Fat</Label><Input type="number" name="totalFat" value={formData.totalFat} onChange={handleFormChange} /></FormGroup></Col>
            </Row>
            <Row>
              <Col md={6}><FormGroup><Label>Sat Fat</Label><Input type="number" name="satFat" value={formData.satFat} onChange={handleFormChange} /></FormGroup></Col>
              <Col md={6}><FormGroup><Label>Trans Fat</Label><Input type="number" name="transFat" value={formData.transFat} onChange={handleFormChange} /></FormGroup></Col>
            </Row>
            <Row>
              <Col md={6}><FormGroup><Label>Protein</Label><Input type="number" name="protein" value={formData.protein} onChange={handleFormChange} /></FormGroup></Col>
              <Col md={6}><FormGroup><Label>Carbs</Label><Input type="number" name="carbs" value={formData.carbs} onChange={handleFormChange} /></FormGroup></Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveNewFood}>Save</Button>
          <Button color="secondary" onClick={toggleAddModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* --- Edit Item --- */}
      <Modal isOpen={editItemModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Food Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleFormChange} />
            </FormGroup>
            <Row>
              <Col md={6}><FormGroup><Label>Calories</Label><Input type="number" name="calories" value={formData.calories} onChange={handleFormChange} /></FormGroup></Col>
              <Col md={6}><FormGroup><Label>Total Fat</Label><Input type="number" name="totalFat" value={formData.totalFat} onChange={handleFormChange} /></FormGroup></Col>
            </Row>
            <Row>
              <Col md={6}><FormGroup><Label>Sat Fat</Label><Input type="number" name="satFat" value={formData.satFat} onChange={handleFormChange} /></FormGroup></Col>
              <Col md={6}><FormGroup><Label>Trans Fat</Label><Input type="number" name="transFat" value={formData.transFat} onChange={handleFormChange} /></FormGroup></Col>
            </Row>
            <Row>
              <Col md={6}><FormGroup><Label>Protein</Label><Input type="number" name="protein" value={formData.protein} onChange={handleFormChange} /></FormGroup></Col>
              <Col md={6}><FormGroup><Label>Carbs</Label><Input type="number" name="carbs" value={formData.carbs} onChange={handleFormChange} /></FormGroup></Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveEditedFood}>Save Changes</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </Container>
  );
}

export default App;
