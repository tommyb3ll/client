import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const EditFoodModal = ({ isOpen, toggle, item, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    protein: 0,
    carbs: 0,
    category: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      // Populate form when item changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: item.name || '',
        calories: item.calories || 0,
        totalFat: item.totalFat || 0,
        saturatedFat: item.saturatedFat || 0,
        transFat: item.transFat || 0,
        protein: item.protein || 0,
        carbs: item.carbs || 0,
        category: item.category || ''
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('');
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'category' ? value : parseFloat(value) || 0
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (formData.calories < 0) {
      setError('Calories cannot be negative');
      return false;
    }
    if (formData.totalFat < 0 || formData.saturatedFat < 0 || formData.transFat < 0 || 
        formData.protein < 0 || formData.carbs < 0) {
      setError('Nutritional values cannot be negative');
      return false;
    }
    if (formData.saturatedFat > formData.totalFat) {
      setError('Saturated fat cannot exceed total fat');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Edit Food Item</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="calories">Calories</Label>
            <Input
              type="number"
              name="calories"
              id="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="totalFat">Total Fat (g)</Label>
            <Input
              type="number"
              name="totalFat"
              id="totalFat"
              value={formData.totalFat}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="saturatedFat">Saturated Fat (g)</Label>
            <Input
              type="number"
              name="saturatedFat"
              id="saturatedFat"
              value={formData.saturatedFat}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="transFat">Trans Fat (g)</Label>
            <Input
              type="number"
              name="transFat"
              id="transFat"
              value={formData.transFat}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="protein">Protein (g)</Label>
            <Input
              type="number"
              name="protein"
              id="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="carbs">Total Carbohydrate (g)</Label>
            <Input
              type="number"
              name="carbs"
              id="carbs"
              value={formData.carbs}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} size="lg">
          Save Changes
        </Button>{' '}
        <Button color="secondary" onClick={toggle} size="lg">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditFoodModal;
