import React from "react";

export default function Filter({ filter, onChange }) {
  const opts = ["All", "Food", "Transport", "Entertainment", "Education", "Other"];
  return (
    <div className="filter-section">
      <label htmlFor="filterCategory">Filter by Category:</label>
      <select
        id="filterCategory"
        value={filter}
        onChange={e => onChange(e.target.value)}
      >
        {opts.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
