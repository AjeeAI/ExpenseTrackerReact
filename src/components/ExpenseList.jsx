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

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (!expenses.length) {
    return <p className="empty">No expenses yet.</p>;
  }

  return (
    <div className="table-container">
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
          <td className="actions">
            <button className="edit-btn" onClick={() => onEdit(exp)}>✏️</button>
            <button
              className="delete-btn"
              onClick={() => {
                if (window.confirm("Delete this expense?")) onDelete(exp.id);
              }}
            >
              🗑️
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default ExpenseList;
