import React, { useState } from "react";

const defaultCategories = [
  "Food",
  "Transport",
  "Entertainment",
  "Education",
  "Other",
];

function ExpenseForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(defaultCategories[0]);
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  function reset() {
    setName("");
    setAmount("");
    setCategory(defaultCategories[0]);
    setDate(new Date().toISOString().slice(0, 10));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!name.trim() || isNaN(amt) || amt <= 0 || !date) {
      alert("Please enter valid expense details.");
      return;
    }
    onAdd({
      name: name.trim(),
      amount: amt,
      category,
      date,
    });
    reset();
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount (₦)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {defaultCategories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;