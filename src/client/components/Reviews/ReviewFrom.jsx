import React, { useState, useEffect } from "react";
import "./Reviews.css";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState("");

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      });
  }, []);

  const handleFormSubmit = () => {
    const data = {
      meal_id: selectedMealId,
      title: title,
      description: description,
      stars: rating,
      created_date: new Date().toJSON().slice(0, 10),
    };
    console.log(data);
    setIsLoading(true);

    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTitle("");
        setDescription("");
        setRating("");
        setIsLoading(false);
        setSelectedMealId("");
        alert("Your review has been sent.");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="reviewpage">
      <form className="res-form-container">
        <h3 className="res-title">Write a review for a meal:</h3>
        <div className="res-form-input">
          <label htmlFor="meal">Choose a meal: </label>
          <select
            id="meal"
            value={selectedMealId}
            onChange={(e) => setSelectedMealId(e.target.value)}
            required
          >
            <option value="">-- Select a meal --</option>
            {meals.map((meal) => (
              <option key={meal.id} value={meal.id}>
                {meal.title}
              </option>
            ))}
          </select>
        </div>
        <div className="res-form-input">
          <label htmlFor="title">*Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="title"
            required
          />
        </div>
        <div className="res-form-input">
          <label htmlFor="description">*Comments: </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="description"
            required
          />
        </div>
        <div className="res-form-input">
          <label htmlFor="rating">*Rating: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
            id="stars"
            required
          />
        </div>
        <button type="button" onClick={handleFormSubmit}>
          Send review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;

