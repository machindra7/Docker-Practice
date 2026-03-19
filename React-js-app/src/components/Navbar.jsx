import React from 'react';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="brand-logo">🚆</div>
          <div>
            <h1>RailSwift</h1>
            <p>Smart Train Booking</p>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#search">Search</a>
          <a href="#booking">Booking</a>
          <a href="#tickets">Tickets</a>
        </nav>
      </div>
    </header>
  );
}