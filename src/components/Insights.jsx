import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function Insights() {
  const { transactions } = useContext(DataContext);

  const total = transactions.reduce((a,b)=>a+b.amount,0);

  return (
    <div>
      <h2>Insights</h2>
      <p>Total activity: {total}</p>
    </div>
  );
}