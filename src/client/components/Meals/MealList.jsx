import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MealContext } from "../MealContext";
import Meal from "./Meal";

function MealList() {
  const { meals, error, loading, getMeal } = useContext(MealContext);

  if (loading) {
    return <div>Loading meals...</div>;
  }

  if (error) {
    return <div>Error loading meals: {error.message}</div>;
  }

  if (!meals.length) {
    return <div>No meals to display.</div>;
  }

  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <div key={meal.id}>
          <Link to={`/meals/${meal.id}`}>
            <Meal meal={meal} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MealList;
