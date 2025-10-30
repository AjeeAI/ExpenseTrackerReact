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

function Summary({ total }) {
  return (
    <div className="summary">
      <h2>Total Spent: <span id="totalAmount">{formatCurrency(total)}</span></h2>
    </div>
  );
}

export default Summary;
