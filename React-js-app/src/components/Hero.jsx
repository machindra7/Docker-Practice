import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-badge">Fast • Easy • Comfortable</span>
          <h2>Book train tickets without the platform chaos.</h2>
          <p>
            Search routes, compare classes, reserve seats, and keep all your
            travel plans in one bright little dashboard.
          </p>
        </div>

        <div className="hero-card">
          <div className="hero-stat">
            <strong>120+</strong>
            <span>Routes</span>
          </div>
          <div className="hero-stat">
            <strong>24/7</strong>
            <span>Support</span>
          </div>
          <div className="hero-stat">
            <strong>Easy</strong>
            <span>Cancellation</span>
          </div>
        </div>
      </div>
    </section>
  );
}