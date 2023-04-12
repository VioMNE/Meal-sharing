import React, { createContext, useState, useEffect } from "react";

const MealContext = createContext({
  meals: [],
  error: null,
  loading: false,
  getMeal: {},
});

const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchMeals() {
    try {
      const res = await fetch("/api/meals");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchMeals()
      .then((data) => setMeals(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const getMeal = (mealId) => {
    if (!meals) return undefined;
    return meals.find((meal) => meal.id === parseInt(mealId));
  };

  return (
    <MealContext.Provider value={{ meals, error, loading, getMeal }}>
      {children}
    </MealContext.Provider>
  );
};

export { MealContext, MealProvider };
