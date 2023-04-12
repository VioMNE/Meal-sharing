import React from "react";
import "./Meal.css";

function Meal({ meal: { id, title, description, price }, showDetails }) {
  return (
    <div className="meal-box">
      <div className="meal-details">
        <h3 className="meal-title">{title}</h3>
        {showDetails && (
          <>
            <p className="meal-description">{description}</p>
            <p className="meal-price">${price} .kr</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Meal;
