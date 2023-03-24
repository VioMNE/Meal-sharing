import React, { useState, useEffect } from 'react';
import Meal from './Meal';

async function fetchMeals() {
  const res = await fetch('/api/meals');
  const data = await res.json();
  return data;
}

function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals().then(data => setMeals(data));
  },[]);

  return (
    <div className="meal-grid">
      {meals.map(meal => <Meal key={meal.id} meal={meal} />)}
    </div>
  );
}

export default MealList;
