import React, { useEffect, useState } from "react";
import BudgetSetter from "./components/BudgetSetter";
import ExpenseForm from "./components/ExpenseForm";
import Filter from "./components/Filter";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("expenses")) || [];
    } catch {
      return [];
    }
  });

  const [budget, setBudget] = useState(() => {
    const b = localStorage.getItem("budget");
    return b ? Number(b) : 0;
  });

  const [filter, setFilter] = useState("All");

  // persist expenses/budget
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", String(budget));
  }, [budget]);

  function addExpense(exp) {
    // ensure number
    const newExp = { ...exp, id: Date.now() };
    setExpenses(prev => [newExp, ...prev]);
  }

  function deleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter(e => e.category === filter);

  const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <div className="container">
      <h1>Personal Expense Tracker</h1>

      <BudgetSetter budget={budget} setBudget={setBudget} total={total} />

      <Summary total={total} />

      <ExpenseForm onAdd={addExpense} />

      <Filter filter={filter} onChange={setFilter} />

      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
      />
    </div>
  );
}
