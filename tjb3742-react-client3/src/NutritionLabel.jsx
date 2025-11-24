import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import './NutritionLabel.css';

// FDA guidelines for "high" values (per serving)
const HIGH_THRESHOLDS = {
  totalFat: 17.5, // grams
  saturatedFat: 5, // grams
  transFat: 0.5, // grams
  protein: 10, // grams (high is good)
  carbohydrate: 17.5, // grams
  calories: 400
};

const NutritionLabel = ({ item, isTotal = false }) => {
  if (!item) return null;

  const isHighValue = (nutrient, value) => {
    return value >= HIGH_THRESHOLDS[nutrient];
  };

  const getNutrientClass = (nutrient, value) => {
    if (nutrient === 'protein') {
      // High protein is good
      return isHighValue(nutrient, value) ? 'high-good' : '';
    }
    // High fat, saturated fat, trans fat, carbs are concerning
    return isHighValue(nutrient, value) ? 'high-warning' : '';
  };

  return (
    <Card className="nutrition-label">
      <CardBody>
        <CardTitle tag="h5" className="nutrition-label-title">
          {isTotal ? 'Total Nutrition Facts' : 'Nutrition Facts'}
        </CardTitle>
        {!isTotal && <div className="serving-info">{item.name}</div>}
        
        <div className="nutrition-divider thick"></div>
        
        <div className={`nutrition-row main ${getNutrientClass('calories', item.calories)}`}>
          <span className="nutrition-label-text">Calories</span>
          <span className="nutrition-value bold">{item.calories}</span>
        </div>
        
        <div className="nutrition-divider"></div>
        
        <div className="daily-value-header">% Daily Value*</div>
        
        <div className={`nutrition-row ${getNutrientClass('totalFat', item.totalFat)}`}>
          <span className="nutrition-label-text"><strong>Total Fat</strong> {item.totalFat}g</span>
          <span className="nutrition-value bold">{Math.round((item.totalFat / 78) * 100)}%</span>
        </div>
        
        <div className={`nutrition-row indent ${getNutrientClass('saturatedFat', item.saturatedFat)}`}>
          <span className="nutrition-label-text">Saturated Fat {item.saturatedFat}g</span>
          <span className="nutrition-value bold">{Math.round((item.saturatedFat / 20) * 100)}%</span>
        </div>
        
        <div className={`nutrition-row indent ${getNutrientClass('transFat', item.transFat)}`}>
          <span className="nutrition-label-text">Trans Fat {item.transFat}g</span>
          <span className="nutrition-value"></span>
        </div>
        
        <div className="nutrition-divider"></div>
        
        <div className={`nutrition-row ${getNutrientClass('carbohydrate', item.carbohydrate)}`}>
          <span className="nutrition-label-text"><strong>Total Carbohydrate</strong> {item.carbohydrate}g</span>
          <span className="nutrition-value bold">{Math.round((item.carbohydrate / 275) * 100)}%</span>
        </div>
        
        <div className="nutrition-divider"></div>
        
        <div className={`nutrition-row ${getNutrientClass('protein', item.protein)}`}>
          <span className="nutrition-label-text"><strong>Protein</strong> {item.protein}g</span>
          <span className="nutrition-value bold">{Math.round((item.protein / 50) * 100)}%</span>
        </div>
        
        <div className="nutrition-divider thick"></div>
        
        <div className="daily-value-footer">
          * The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet.
          2,000 calories a day is used for general nutrition advice.
        </div>
      </CardBody>
    </Card>
  );
};

export default NutritionLabel;
