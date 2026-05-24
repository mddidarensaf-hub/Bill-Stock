// src/views/Dashboard.js
import React from 'react';
import { StatCard } from '../Components/StatCard'; // পথটি খেয়াল করুন

const Dashboard = ({ inventory, salesHistory = [] }) => {
  const totalItems = inventory.length;
  const totalStockValue = inventory.reduce((acc, i) => acc + (i.price * i.stock), 0);
  const lowStockItems = inventory.filter(i => i.stock <= 5).length;
  
  // আপনি যদি লাভ-ক্ষতি দেখাতে চান তবে নিচের লাইনটি যোগ করতে পারেন
  const totalProfit = salesHistory.reduce((acc, sale) => acc + sale.profit, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
      <StatCard value={totalItems} label="Total Products" color="#3498db" />
      <StatCard value={totalStockValue.toFixed(2)} label="Stock Value (BDT)" color="#27ae60" />
      <StatCard value={lowStockItems} label="Low Stock Items" color="#e74c3c" />
      {/* লাভের জন্য আরেকটি কার্ড */}
      <StatCard value={totalProfit.toFixed(2)} label="Total Profit" color="#f1c40f" />
    </div>
  );
};

export default Dashboard;