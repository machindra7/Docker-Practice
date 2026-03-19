import React, { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <section className="search-panel" id="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>From</label>
          <input
            type="text"
            name="from"
            placeholder="Enter source city"
            value={form.from}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>To</label>
          <input
            type="text"
            name="to"
            placeholder="Enter destination city"
            value={form.to}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Journey Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn" type="submit">
          Search Trains
        </button>
      </form>
    </section>
  );
}