import React from "react";
import "./BudgetDisplay.css";

const BudgetDisplay = ({ budget, expenses, onSetBudget }) => {
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = budget - totalSpent;

  const formatCurrency = (amount) =>
    "₦" + amount.toLocaleString("en-NG", { minimumFractionDigits: 2 });

  let alertMessage = "";
  if (budget > 0 && totalSpent >= budget * 0.8 && totalSpent < budget) {
    alertMessage = "You've used over 80% of your budget!";
  } else if (budget > 0 && totalSpent >= budget) {
    alertMessage = "You've exceeded your budget!";
  }

  const handleBudgetChange = (e) => {
    const newBudget = Number(e.target.value);
    if (newBudget >= 0) {
      onSetBudget(newBudget);
    }
  };

  return (
    <div className="budget-wrapper">
      <h2>Monthly Budget Overview</h2>

      <div className="budget-input-container">
       <div>
        {budget}
       </div>
      </div>

      <div className="budget-card">
        <div className="budget-section">
          <h4>Budget</h4>
          <p className="budget-amount">{formatCurrency(budget)}</p>
        </div>

        <div className="budget-section center">
          <h4>Remaining</h4>
          <p
            className={`remaining-amount ${
              remaining >= 0 ? "positive" : "negative"
            }`}
          >
            {formatCurrency(remaining >= 0 ? remaining : 0)}
          </p>
        </div>

        <div className="budget-section">
          <h4>Total Spent</h4>
          <p className="spent-amount">{formatCurrency(totalSpent)}</p>
        </div>
      </div>

      {alertMessage && <p className="budget-alert">{alertMessage}</p>}
    </div>
  );
};

export default BudgetDisplay;
