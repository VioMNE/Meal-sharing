import React, { useState, useEffect } from 'react';

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
    <div>
      {meals.map(meal => (
        <div key={meal.id}>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>{meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MealList;