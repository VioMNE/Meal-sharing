import React from "react";
import MealDetails from "../Reservations/MealDetails";
import "./Meal.css";
import ReviewForm from "../Reviews/ReviewFrom";
function Meal({ meal: { id, title, description, price } }) {
  return (
    <div className="meal-box">
      <div className="meal-details">
        <h3 className="meal-title">{title}</h3>
        <p className="meal-description">{description}</p>
        <p className="meal-price">${price} .kr</p>
      </div>
    </div>
  );
}

export default Meal;
