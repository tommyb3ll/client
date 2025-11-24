import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

const CalorieGoalModal = ({ isOpen, toggle, currentGoal, onSave }) => {
  const [goal, setGoal] = useState(currentGoal);
  const [error, setError] = useState('');

  useEffect(() => {
    setGoal(currentGoal);
  }, [currentGoal]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setGoal(value);
    if (value <= 0) {
      setError('Goal must be greater than 0');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (goal > 0) {
      onSave(goal);
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Set Daily Calorie Goal
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="calorieGoal">Daily Calorie Goal *</Label>
          <Input
            type="number"
            name="calorieGoal"
            id="calorieGoal"
            value={goal}
            onChange={handleChange}
            invalid={!!error}
            style={{ fontSize: '1.1rem', padding: '12px' }}
            step="100"
            min="1"
          />
          {error && <div className="text-danger">{error}</div>}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} size="lg" style={{ minWidth: '100px' }}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} size="lg" style={{ minWidth: '100px' }} disabled={!!error || goal <= 0}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CalorieGoalModal;
