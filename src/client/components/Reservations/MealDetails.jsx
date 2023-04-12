import { useParams, Redirect, Link } from "react-router-dom";
import React, { useContext } from "react";
import { MealContext } from "../MealContext";
import ReservationForm from "./ReservationForm";

function MealDetails() {
  // @ts-ignore
  const { id } = useParams();
  const { getMeal } = useContext(MealContext);
  // @ts-ignore
  const meal = getMeal(id);

  if (!meal) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="mealdetails-header">
        <h3>Your perfect bowl of {meal.title}!</h3>
      </div>
      <div>
        <div className="meal-box">
          <div className="meal-details">
            <h3 className="meal-title">{meal.title}</h3>
            <p className="meal-description">{meal.description}</p>
            <p className="meal-price">${meal.price} .kr</p>
          </div>
          <div className="res-form">
            <ReservationForm mealId={id} />
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MealDetails;