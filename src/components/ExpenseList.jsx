import React from "react";

function formatCurrency(amount) {
  
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return "₦" + Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 });
  }
}

export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) {
    return <p className="empty">No expenses yet.</p>;
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Expense</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.name}</td>
            <td>{formatCurrency(exp.amount)}</td>
            <td className={`category-${exp.category}`}>{exp.category}</td>
            <td>{exp.date}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Delete this expense?")) onDelete(exp.id);
                }}
                title="Delete"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
