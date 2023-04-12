import React, { useState, useEffect } from "react";
import "./Reservation.css";

function ReservationForm({ mealId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableReservations, setAvailableReservations] = useState(0);

  const handleFormSubmit = () => {
    const bookingData = {
      meal_id: mealId,
      contact_name: name,
      contact_email: email,
      contact_phonenumber: phone,
      number_of_guests: Number(numberOfGuests),
      created_date: new Date().toJSON().slice(0, 10),
    };
    setLoading(true);
    if (availableReservations > 0) {
      fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong.");
          }
          return response.json();
        })
        .then((data) => {
          setName("");
          setEmail("");
          setPhone("");
          setNumberOfGuests("");
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          updateAvailableReservations();
        });
    } else {
      alert("Sorry, there are no available reservations.");
    }
  };
  

  const updateAvailableReservations = async () => {
    const reservations = await fetch(`/api/reservations/${mealId}`).then((r) =>
      r.json()
    );
    const totalReservations = reservations.reduce((n, reservation) => {
      return n + reservation.number_of_guests;
    }, 0);
    const [{ max_reservations: maxReservations }] = await fetch(
      `/api/meals/${mealId}`
    ).then((r) => r.json());
    setAvailableReservations(maxReservations - totalReservations);
  };

  useEffect(() => {
    updateAvailableReservations();
  }, []);

  return (
    <form className="reservation-form-container">
      <h3 className="reservation-title">Make your reservation.</h3>
      {availableReservations !== null ? (
        <p>Available reservations: {availableReservations}</p>
      ) : (
        <p>No more reservations available.</p>
      )}
      <div className="reservation-form-input">
        <label htmlFor="name">*Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="name"
          required
        />
      </div>
      <div className="reservation-form-input">
        <label htmlFor="email">*Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="email"
          required
        />
      </div>
      <div className="reservation-form-input">
        <label htmlFor="cellPhone">*Phone: </label>
        <input
          type="tel"
          pattern="[0-9]{8}"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          id="cellPhone"
          required
        />
      </div>
      <div className="reservation-form-input">
        <label htmlFor="numOfGests">*Number of guests: </label>
        <input
          type="number"
          min="1"
          value={numberOfGuests}
          onChange={(e) => {
            setNumberOfGuests(e.target.value);
          }}
          id="numOfGests"
          required
        />
      </div>
      <button type="button" onClick={handleFormSubmit}>
        Book seat
      </button>
    </form>
  );
}
export default ReservationForm;
