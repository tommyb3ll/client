import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const FoodItemModal = ({ isOpen, toggle, item, onSave, isEdit = false, category }) => {
  // Initialize form data based on whether we're editing or adding
  const getInitialFormData = () => {
    if (item && isEdit) {
      return {
        name: item.name || '',
        calories: item.calories || 0,
        totalFat: item.totalFat || 0,
        saturatedFat: item.saturatedFat || 0,
        transFat: item.transFat || 0,
        protein: item.protein || 0,
        carbohydrate: item.carbohydrate || 0,
        category: item.category || category || ''
      };
    }
    return {
      name: '',
      calories: 0,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      protein: 0,
      carbohydrate: 0,
      category: category || ''
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});

  // Reset form data when modal opens/closes or item changes
  useEffect(() => {
    setFormData(getInitialFormData());
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, item?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === 'name' ? value : parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [name]: numericValue
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    
    if (formData.calories < 0) {
      newErrors.calories = 'Calories cannot be negative';
    }
    
    if (formData.totalFat < 0) {
      newErrors.totalFat = 'Total fat cannot be negative';
    }
    
    if (formData.saturatedFat < 0) {
      newErrors.saturatedFat = 'Saturated fat cannot be negative';
    }
    
    if (formData.saturatedFat > formData.totalFat) {
      newErrors.saturatedFat = 'Saturated fat cannot exceed total fat';
    }
    
    if (formData.transFat < 0) {
      newErrors.transFat = 'Trans fat cannot be negative';
    }
    
    if (formData.protein < 0) {
      newErrors.protein = 'Protein cannot be negative';
    }
    
    if (formData.carbohydrate < 0) {
      newErrors.carbohydrate = 'Carbohydrate cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        {isEdit ? 'Edit Food Item' : 'Add New Food Item'}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Food Name *</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              invalid={!!errors.name}
              style={{ fontSize: '1.1rem', padding: '12px' }}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="calories">Calories *</Label>
                <Input
                  type="number"
                  name="calories"
                  id="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  invalid={!!errors.calories}
                  style={{ fontSize: '1.1rem', padding: '12px' }}
                  step="1"
                  min="0"
                />
                {errors.calories && <div className="text-danger">{errors.calories}</div>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="protein">Protein (g) *</Label>
                <Input
                  type="number"
                  name="protein"
                  id="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  invalid={!!errors.protein}
                  style={{ fontSize: '1.1rem', padding: '12px' }}
                  step="0.1"
                  min="0"
                />
                {errors.protein && <div className="text-danger">{errors.protein}</div>}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="totalFat">Total Fat (g) *</Label>
                <Input
                  type="number"
                  name="totalFat"
                  id="totalFat"
                  value={formData.totalFat}
                  onChange={handleChange}
                  invalid={!!errors.totalFat}
                  style={{ fontSize: '1.1rem', padding: '12px' }}
                  step="0.1"
                  min="0"
                />
                {errors.totalFat && <div className="text-danger">{errors.totalFat}</div>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="carbohydrate">Total Carbohydrate (g) *</Label>
                <Input
                  type="number"
                  name="carbohydrate"
                  id="carbohydrate"
                  value={formData.carbohydrate}
                  onChange={handleChange}
                  invalid={!!errors.carbohydrate}
                  style={{ fontSize: '1.1rem', padding: '12px' }}
                  step="0.1"
                  min="0"
                />
                {errors.carbohydrate && <div className="text-danger">{errors.carbohydrate}</div>}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="saturatedFat">Saturated Fat (g) *</Label>
                <Input
                  type="number"
                  name="saturatedFat"
                  id="saturatedFat"
                  value={formData.saturatedFat}
                  onChange={handleChange}
                  invalid={!!errors.saturatedFat}
                  style={{ fontSize: '1.1rem', padding: '12px' }}
                  step="0.1"
                  min="0"
                />
                {errors.saturatedFat && <div className="text-danger">{errors.saturatedFat}</div>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="transFat">Trans Fat (g) *</Label>
                <Input
                  type="number"
                  name="transFat"
                  id="transFat"
                  value={formData.transFat}
                  onChange={handleChange}
                  invalid={!!errors.transFat}
                  style={{ fontSize: '1.1rem', padding: '12px' }}
                  step="0.1"
                  min="0"
                />
                {errors.transFat && <div className="text-danger">{errors.transFat}</div>}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} size="lg" style={{ minWidth: '100px' }}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} size="lg" style={{ minWidth: '100px' }}>
          {isEdit ? 'Save Changes' : 'Add Item'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FoodItemModal;
