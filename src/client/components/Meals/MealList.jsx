import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MealContext } from "../MealContext";
import Meal from "./Meal";

function MealList() {
  const { meals, error, loading, getMeal } = useContext(MealContext);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("when_date");
  const [sortDir, setSortDir] = useState("asc");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortKey(e.target.value);
    if (e.target.value === "price" || e.target.value === "max_reservations") {
      setSortDir("asc");
    } else {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    }
  };
  
  const filteredMeals = meals.filter(
    (meal) => meal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedMeals = filteredMeals.sort((a, b) => {
    if (sortKey === "price") {
      return sortDir === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortKey === "max_reservations") {
      return sortDir === "asc" ? a.max_reservations - b.max_reservations : b.max_reservations - a.max_reservations;
    } else {
      if (a[sortKey] < b[sortKey]) {
        return sortDir === "asc" ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDir === "asc" ? 1 : -1;
      }
      return 0;
    }
  });
  

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
    <div>
      
      <div className="search-bar">
        <input className="input-bar"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="sort-dropdown">
        <label className="sort">
          Sort by:
          <select className="sort-select" value={sortKey} onChange={handleSort}>
            <option value="when_date">Date</option>
            <option value="max_reservations">Reservations</option>
            <option value="price">Price</option>
          </select>
        </label>
        <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
          {sortDir === "asc" ? (
            <i className="fas fa-arrow-down"></i>
          ) : (
            <i className="fas fa-arrow-up"></i>
          )}
        </button>
      </div>
  
      <div className="meal-grid">
        {sortedMeals.map((meal) => (
          <div key={meal.id}>
            <Link to={`/meals/${meal.id}`}>
              <Meal meal={meal} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default MealList;