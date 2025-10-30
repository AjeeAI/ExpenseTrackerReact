import React, { useState } from "react";

function BudgetSetter({ budget, setBudget, total }) {
  const [value, setValue] = useState(budget || "");

  function handleSet() {
    const n = Number(value);
    if (isNaN(n) || n < 0) {
      alert("Enter a valid budget amount");
      return;
    }
    setBudget(n);
  }

  return (
    <div className="budget-section">
      <label htmlFor="budget">Set Monthly Budget (₦):</label>
      <input
        id="budget"
        type="number"
        placeholder="Enter budget"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleSet}>Set Budget</button>
      <p className="alert">
        {budget > 0 && total >= budget * 0.8 && total < budget
          ? "Warning: You've used over 80% of your budget!"
          : budget > 0 && total >= budget
          ? "You've exceeded your budget!"
          : ""}
      </p>
    </div>
  );
}

export default BudgetSetter;