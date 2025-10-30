import React, { useEffect, useState } from "react";
import BudgetSetter from "./components/BudgetSetter";
import ExpenseForm from "./components/ExpenseForm";
import Filter from "./components/Filter";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import ExpenseStats from "./components/ExpenseStats";
import BudgetDisplay from "./components/BudgetDisplay";

function App() {
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

  // 🟢 NEW: Track which expense is being edited
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", String(budget));
  }, [budget]);

  function addExpense(exp) {
    if (editingExpense) {
      // 🟢 Update existing expense
      setExpenses(prev =>
        prev.map(e =>
          e.id === editingExpense.id ? { ...exp, id: editingExpense.id } : e
        )
      );
      setEditingExpense(null); // reset after editing
    } else {
      // 🟢 Add new expense
      const newExp = { ...exp, id: Date.now() };
      setExpenses(prev => [newExp, ...prev]);
    }
  }

  function deleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  // 🟢 New function for handling edits
  function editExpense(expense) {
    setEditingExpense(expense);
  }

  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter(e => e.category === filter);

  const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <div className="container">
      <h1>Personal Expense Tracker</h1>
      <BudgetDisplay budget={budget} expenses={expenses} onSetBudget={setBudget} />
      <BudgetSetter budget={budget} setBudget={setBudget} total={total} />

      <Summary total={total} />

      {/* 🟢 Pass editingExpense and setter to ExpenseForm */}
      <ExpenseForm onAdd={addExpense} editingExpense={editingExpense} />

      <Filter filter={filter} onChange={setFilter} />

      {/* 🟢 Pass the edit handler */}
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={editExpense}
      />

      <ExpenseStats expenses={filteredExpenses} />
    </div>
  );
}

export default App;
