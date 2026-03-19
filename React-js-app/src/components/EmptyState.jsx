import React from 'react';

export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🎫</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}