import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseStats = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <div className="stats-container">
        <p>No expenses yet.</p>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const highestExpense = Math.max(...expenses.map(exp => exp.amount));
  const numExpenses = expenses.length;

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const formatCurrency = amount =>
    "₦" + amount.toLocaleString("en-NG", { minimumFractionDigits: 2 });

  // Convert category totals to data for the PieChart
  const chartData = Object.entries(categoryTotals).map(([category, value]) => ({
    name: category,
    value,
  }));

  // Assign colors to categories
  const COLORS = ["#ff9800", "#2196f3", "#4caf50", "#9c27b0", "#607d8b"];

  return (
    <div className="stats-container">
      <h2>Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Spent</h3>
          <p>{formatCurrency(totalAmount)}</p>
        </div>
        <div className="stat-card">
          <h3>Number of Expenses</h3>
          <p>{numExpenses}</p>
        </div>
        <div className="stat-card">
          <h3>Highest Expense</h3>
          <p>{formatCurrency(highestExpense)}</p>
        </div>
      </div>

      <div className="category-breakdown">
        <h3>Spending Breakdown</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300} >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;
