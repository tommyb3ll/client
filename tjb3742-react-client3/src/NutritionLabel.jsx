import React from 'react';
import { Card, CardBody, Badge } from 'reactstrap';
import './NutritionLabel.css';

const NutritionLabel = ({ item, isTotal = false }) => {
  if (!item) {
    return (
      <Card className="nutrition-label">
        <CardBody>
          <p className="text-center text-muted">No item selected</p>
        </CardBody>
      </Card>
    );
  }

  // FDA Daily Values for reference (2000 calorie diet)
  const dailyValues = {
    totalFat: 78,
    saturatedFat: 20,
    transFat: 2,
    protein: 50,
    carbs: 275
  };

  const getPercentDV = (value, dvValue) => {
    return Math.round((value / dvValue) * 100);
  };

  const isHigh = (value, dvValue) => {
    const percent = getPercentDV(value, dvValue);
    return percent >= 20;
  };

  return (
    <Card className="nutrition-label">
      <CardBody>
        <h5 className="nutrition-title">Nutrition Facts</h5>
        {!isTotal && <p className="serving-info">{item.name}</p>}
        {isTotal && <p className="serving-info">Total Selected Items</p>}
        
        <div className="nutrition-line thick"></div>
        
        <div className="nutrition-row">
          <span className="nutrition-label-text">
            <strong>Calories</strong>
          </span>
          <span className="nutrition-value">
            <strong>{Math.round(item.calories)}</strong>
            {isHigh(item.calories, 2000) && (
              <Badge color="danger" pill className="ms-2">HIGH</Badge>
            )}
          </span>
        </div>
        
        <div className="nutrition-line"></div>
        
        <div className="nutrition-row small-text">
          <span><strong>Total Fat</strong> {item.totalFat?.toFixed(1)}g</span>
          <span>
            <strong>{getPercentDV(item.totalFat, dailyValues.totalFat)}%</strong>
            {isHigh(item.totalFat, dailyValues.totalFat) && (
              <Badge color="warning" pill className="ms-2">HIGH</Badge>
            )}
          </span>
        </div>
        
        <div className="nutrition-row indent small-text">
          <span>Saturated Fat {item.saturatedFat?.toFixed(1)}g</span>
          <span>
            <strong>{getPercentDV(item.saturatedFat, dailyValues.saturatedFat)}%</strong>
            {isHigh(item.saturatedFat, dailyValues.saturatedFat) && (
              <Badge color="warning" pill className="ms-2">HIGH</Badge>
            )}
          </span>
        </div>
        
        <div className="nutrition-row indent small-text">
          <span>Trans Fat {item.transFat?.toFixed(1)}g</span>
          <span>
            {item.transFat > 0 && (
              <Badge color="danger" pill>AVOID</Badge>
            )}
          </span>
        </div>
        
        <div className="nutrition-line"></div>
        
        <div className="nutrition-row small-text">
          <span><strong>Total Carbohydrate</strong> {item.carbs?.toFixed(1)}g</span>
          <span>
            <strong>{getPercentDV(item.carbs, dailyValues.carbs)}%</strong>
            {isHigh(item.carbs, dailyValues.carbs) && (
              <Badge color="info" pill className="ms-2">HIGH</Badge>
            )}
          </span>
        </div>
        
        <div className="nutrition-line"></div>
        
        <div className="nutrition-row small-text">
          <span><strong>Protein</strong> {item.protein?.toFixed(1)}g</span>
          <span>
            <strong>{getPercentDV(item.protein, dailyValues.protein)}%</strong>
          </span>
        </div>
        
        <div className="nutrition-line thick"></div>
        
        <p className="dv-note">
          * Percent Daily Values are based on a 2,000 calorie diet.
        </p>
      </CardBody>
    </Card>
  );
};

export default NutritionLabel;
