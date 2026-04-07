import React, { useContext, useState } from "react"; import { DataContext } from "../context/DataContext";

export default function Transactions() { const { transactions, setTransactions, role } = useContext(DataContext); const [editingId, setEditingId] = useState(null); const [form, setForm] = useState({ date: "", amount: "", category: "" });

const startEdit = (t) => { setEditingId(t.id); setForm({ date: t.date, amount: t.amount, category: t.category }); };

const saveEdit = (id) => { const updated = transactions.map(t => t.id === id ? { ...t, ...form, amount: Number(form.amount) } : t ); setTransactions(updated); setEditingId(null); };

const add = () => { if (role !== "admin") return; setTransactions([...transactions, { id: Date.now(), date: new Date().toISOString().slice(0,10), amount: 0, category: "New", type: "expense" }]); };

const del = (id) => { setTransactions(transactions.filter(t => t.id !== id)); };

return ( <div> <h2>Transactions</h2>

{role === "admin" && <button onClick={add}>Add</button>}

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(t => (
        <tr key={t.id}>
          <td>
            {editingId === t.id ? (
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            ) : t.date}
          </td>

          <td>
            {editingId === t.id ? (
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            ) : t.amount}
          </td>

          <td>
            {editingId === t.id ? (
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            ) : t.category}
          </td>

          <td>
            {role === "admin" && (
              <>
                {editingId === t.id ? (
                  <button onClick={() => saveEdit(t.id)}>Save</button>
                ) : (
                  <button onClick={() => startEdit(t)}>Edit</button>
                )}
                <button onClick={() => del(t.id)}>Delete</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

); }