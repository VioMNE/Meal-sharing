import React from 'react';
import './Meal.css';

function Meal({ meal }) {
  return (
    <div className="meal-box">
      <div className="meal-details">
        <h3 className="meal-title">{meal.title}</h3>
        <p className="meal-description">{meal.description}</p>
        <p className="meal-price">${meal.price} .kr</p>
      </div>
    </div>
  );
}

export default Meal;