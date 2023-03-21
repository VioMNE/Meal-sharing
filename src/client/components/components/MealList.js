import React, { useState, useEffect } from 'react';
import Meal from './Meal';

function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('/api/meals');
      const data = await response.json();
      setMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    <div className="meal-grid">
      {meals.map(meal => <Meal key={meal.id} meal={meal} />)}
    </div>
  );
}

export default MealList;
