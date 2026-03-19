import React from 'react';

export default function TrainCard({ train, onSelect, isSelected }) {
  return (
    <article className={`train-card ${isSelected ? 'train-card-selected' : ''}`}>
      <div className="train-top">
        <div>
          <h3>{train.trainName}</h3>
          <p>
            #{train.trainNumber} • {train.from} to {train.to}
          </p>
        </div>
        <span className="pill">{train.seatsAvailable} seats left</span>
      </div>

      <div className="time-row">
        <div>
          <strong>{train.departure}</strong>
          <span>{train.from}</span>
        </div>
        <div className="time-mid">
          <span>{train.duration}</span>
        </div>
        <div>
          <strong>{train.arrival}</strong>
          <span>{train.to}</span>
        </div>
      </div>

      <div className="fare-box">
        <span>Sleeper ₹{train.fare.Sleeper}</span>
        <span>AC3 ₹{train.fare.AC3}</span>
        <span>AC2 ₹{train.fare.AC2}</span>
      </div>

      <button className="secondary-btn" onClick={() => onSelect(train)}>
        {isSelected ? 'Selected' : 'Select Train'}
      </button>
    </article>
  );
}