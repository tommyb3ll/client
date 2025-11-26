import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const AddFoodModal = ({ isOpen, toggle, category, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    protein: 0,
    carbs: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: '',
        calories: 0,
        totalFat: 0,
        saturatedFat: 0,
        transFat: 0,
        protein: 0,
        carbs: 0
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('');
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : parseFloat(value) || 0
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
      onAdd({ ...formData, category });
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        Add New Food Item to {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name *</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter food name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="calories">Calories *</Label>
            <Input
              type="number"
              name="calories"
              id="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="totalFat">Total Fat (g) *</Label>
            <Input
              type="number"
              name="totalFat"
              id="totalFat"
              value={formData.totalFat}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="saturatedFat">Saturated Fat (g) *</Label>
            <Input
              type="number"
              name="saturatedFat"
              id="saturatedFat"
              value={formData.saturatedFat}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="transFat">Trans Fat (g) *</Label>
            <Input
              type="number"
              name="transFat"
              id="transFat"
              value={formData.transFat}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="protein">Protein (g) *</Label>
            <Input
              type="number"
              name="protein"
              id="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="carbs">Total Carbohydrate (g) *</Label>
            <Input
              type="number"
              name="carbs"
              id="carbs"
              value={formData.carbs}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="0"
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} size="lg">
          Add Item
        </Button>{' '}
        <Button color="secondary" onClick={toggle} size="lg">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddFoodModal;
