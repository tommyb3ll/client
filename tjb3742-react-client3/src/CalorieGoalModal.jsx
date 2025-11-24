import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const CalorieGoalModal = ({ isOpen, toggle, currentGoal, onSave }) => {
  const [goal, setGoal] = useState(2000);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Initialize form when modal opens
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGoal(currentGoal);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('');
    }
  }, [isOpen, currentGoal]);

  const handleChange = (e) => {
    setGoal(parseFloat(e.target.value) || 0);
  };

  const validateForm = () => {
    if (goal <= 0) {
      setError('Calorie goal must be greater than 0');
      return false;
    }
    if (goal > 10000) {
      setError('Calorie goal seems unusually high. Please enter a reasonable value.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(goal);
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Set Daily Calorie Goal</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="goal">Daily Calorie Goal</Label>
            <Input
              type="number"
              name="goal"
              id="goal"
              value={goal}
              onChange={handleChange}
              min="1"
              max="10000"
              step="1"
              required
            />
            <small className="form-text text-muted">
              Recommended: 2000-2500 calories for adults
            </small>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} size="lg">
          Save Goal
        </Button>{' '}
        <Button color="secondary" onClick={toggle} size="lg">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CalorieGoalModal;
