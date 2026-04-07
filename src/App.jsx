import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import { DataContext } from "./context/DataContext";
import { Themee } from "./context/Themee";
import Toggle from "./components/Toggle";
import "./index.css";


export default function App() {
  const [role, setRole] = useState("viewer");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("tx");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tx", JSON.stringify(transactions));
  }, [transactions]);
  
  const { theme } = useContext(Themee);

  return (
    <DataContext.Provider value={{ transactions, setTransactions, role }}>
      <div className={theme === 'light'?'light':'dark'}>
        <Toggle></Toggle>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
             <a class="navbar-brand" href="#">Finance Dashboard UI</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
         <li class="nav-item">
          <Link class="nav-link" to="/">Dashboard</Link>
        </li>
          <li class="nav-item">
          <Link class="nav-link" to="/transactions">Transactions</Link>
        </li>
          <li class="nav-item">
          <Link class="nav-link" to="/insights">Insights</Link>
        </li>
         

          <select onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
           </ul>
          </div>
          </div>
        
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </DataContext.Provider>
  );
}