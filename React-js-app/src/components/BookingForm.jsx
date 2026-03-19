import React, { useMemo, useState } from 'react';

export default function BookingForm({ selectedTrain, journeyDate, onBook }) {
  const [form, setForm] = useState({
    passengerName: '',
    age: '',
    travelClass: 'Sleeper',
    seats: 1
  });

  const farePreview = useMemo(() => {
    if (!selectedTrain) return 0;
    const perSeat = selectedTrain.fare[form.travelClass] || 0;
    return perSeat * Number(form.seats || 1);
  }, [selectedTrain, form.travelClass, form.seats]);

  const handleChange = (e) => {
    const value =
      e.target.name === 'seats' || e.target.name === 'age'
        ? e.target.value
        : e.target.value;

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTrain) {
      alert('Please select a train first.');
      return;
    }

    if (!form.passengerName || !form.age || !form.travelClass || !form.seats) {
      alert('Please fill all fields.');
      return;
    }

    onBook({
      trainId: selectedTrain.id,
      passengerName: form.passengerName,
      age: Number(form.age),
      travelClass: form.travelClass,
      journeyDate: journeyDate || new Date().toISOString().split('T')[0],
      seats: Number(form.seats)
    });

    setForm({
      passengerName: '',
      age: '',
      travelClass: 'Sleeper',
      seats: 1
    });
  };

  return (
    <div className="booking-card" id="booking">
      {selectedTrain ? (
        <div className="selected-train-strip">
          <h3>{selectedTrain.trainName}</h3>
          <p>
            {selectedTrain.from} → {selectedTrain.to} • {selectedTrain.departure} - {selectedTrain.arrival}
          </p>
        </div>
      ) : (
        <div className="selected-train-strip muted-box">
          <h3>No train selected</h3>
          <p>Pick a train from the list above to unlock booking.</p>
        </div>
      )}

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Passenger Name</label>
          <input
            type="text"
            name="passengerName"
            placeholder="Enter full name"
            value={form.passengerName}
            onChange={handleChange}
          />
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              min="1"
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Seats</label>
            <input
              type="number"
              name="seats"
              min="1"
              max={selectedTrain?.seatsAvailable || 1}
              value={form.seats}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Travel Class</label>
          <select
            name="travelClass"
            value={form.travelClass}
            onChange={handleChange}
          >
            <option value="Sleeper">Sleeper</option>
            <option value="AC3">AC3</option>
            <option value="AC2">AC2</option>
          </select>
        </div>

        <div className="fare-preview">
          <span>Estimated Fare</span>
          <strong>₹{farePreview}</strong>
        </div>

        <button className="primary-btn" type="submit">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}