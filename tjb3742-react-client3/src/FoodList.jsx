import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

const FoodList = ({ title, items, selectedItem, onSelectItem }) => {
  return (
    <Card className="food-list-card">
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <ListGroup flush style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {items.length === 0 ? (
            <ListGroupItem className="text-muted text-center">No items available</ListGroupItem>
          ) : (
            items.map((item, index) => (
              <ListGroupItem 
                key={`${item.name}-${index}`}
                active={selectedItem && selectedItem.name === item.name && selectedItem.category === item.category}
                onClick={() => onSelectItem(item)}
                style={{ cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center' }}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{item.name}</span>
                <span className="badge bg-secondary">{item.calories} cal</span>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default FoodList;
