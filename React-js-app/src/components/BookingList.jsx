import React from 'react';
import EmptyState from './EmptyState';

export default function BookingList({ bookings, onCancel }) {
  return (
    <div className="booking-list" id="tickets">
      {bookings.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          message="Once you reserve a ticket, it will appear here like a proud little boarding pass."
        />
      ) : (
        bookings.map((booking) => (
          <div key={booking.bookingId} className="ticket-card">
            <div className="ticket-top">
              <div>
                <h3>{booking.trainName}</h3>
                <p>
                  #{booking.trainNumber} • {booking.from} to {booking.to}
                </p>
              </div>
              <span className="ticket-status">{booking.bookingStatus}</span>
            </div>

            <div className="ticket-grid">
              <p><strong>Passenger:</strong> {booking.passengerName}</p>
              <p><strong>Age:</strong> {booking.age}</p>
              <p><strong>Class:</strong> {booking.travelClass}</p>
              <p><strong>Seats:</strong> {booking.seats}</p>
              <p><strong>Date:</strong> {booking.journeyDate}</p>
              <p><strong>Fare:</strong> ₹{booking.totalFare}</p>
            </div>

            <button
              className="danger-btn"
              onClick={() => onCancel(booking.bookingId)}
            >
              Cancel Ticket
            </button>
          </div>
        ))
      )}
    </div>
  );
}