import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  const { transactions } = useContext(DataContext);

  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 50000);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  const pieData = Object.values(
    transactions.filter(t => t.type === "expense").reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  const lineData = transactions.map(t => ({ date: t.date, amount: t.amount }));

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>Balance: {income - expense}</div>
        <div>Income: {income}</div>
        <div>Expense: {expense}</div>
      </div>

      <div className="grid grid-cols-2 mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}