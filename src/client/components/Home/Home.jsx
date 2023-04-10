import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Meal from "../Meals/Meal";
import { MealContext } from "../MealContext";
import "./Home.css";

function HomePage() {
  const { meals, error, loading } = useContext(MealContext);

  return (
    <div className="home-page">
      <div className="home-content">
      <h1>Welcome to Poké Bowl!</h1>
      <h2>Check out our bowls and enjoy your meal</h2>
      </div>
      
      <div className="meal-grid">
        {meals.slice(0, 4).map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
      <div className="btn">
      <Link to="/meals">
        <button>See all meals</button>
      </Link>
      </div>
     
    </div>
  );
}

export default HomePage;
