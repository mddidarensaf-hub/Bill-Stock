import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Views এবং Components ইমপোর্ট (ফাইল পাথ অনুযায়ী)
import Dashboard from './Views/Dashboard';
import BillingSystem from './Views/BillingSystem';
import ProductList from './Views/ProductList';
import AddProductForm from './Views/AddProductForm';
import SalesHistory from './Views/SalesHistory';

function App() {
  // ১. স্টেট ম্যানেজমেন্ট
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [inventory, setInventory] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);

  // ২. ডাটা লোড করা (মাউন্ট হওয়ার সময়)
  useEffect(() => {
    const savedInv = JSON.parse(localStorage.getItem('myShopInventory')) || [];
    const savedSales = JSON.parse(localStorage.getItem('myShopSales')) || [];
    setInventory(savedInv);
    setSalesHistory(savedSales);
  }, []);

  // ৩. ইনভেন্টরি আপডেট ফাংশন
  const updateInventory = (newInv) => {
    setInventory(newInv);
    localStorage.setItem('myShopInventory', JSON.stringify(newInv));
  };

  // ৪. নতুন পণ্য যোগ করা
  const handleAddProduct = (product) => {
    const updated = [...inventory, { ...product, id: uuidv4() }];
    updateInventory(updated);
    toast.success("পণ্য সফলভাবে যোগ হয়েছে!");
    setActiveTab('Products List');
  };

  // ৫. বিল সম্পন্ন ও লাভ হিসাব করা
  const handleBillComplete = (soldItems, customer, total, profit) => {
    // স্টক কমানো
    const updatedInv = inventory.map(item => {
      const sold = soldItems.find(s => s.id === item.id);
      return sold ? { ...item, stock: item.stock - sold.billQty } : item;
    });
    updateInventory(updatedInv);

    // সেলস হিস্টোরি আপডেট
    const newSale = { customer, total, profit, date: new Date().toLocaleString() };
    const updatedSales = [newSale, ...salesHistory];
    setSalesHistory(updatedSales);
    localStorage.setItem('myShopSales', JSON.stringify(updatedSales));

    toast.success(`বিল সম্পন্ন! লাভ: ${profit.toFixed(2)} BDT`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <ToastContainer position="top-center" autoClose={1500} />
      
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50' }}>🚀 Stock Management Pro</h1>
      </header>

      {/* নেভিগেশন মেনু */}
      <nav style={navContainer}>
        {['Dashboard', 'Bill', 'Products List', 'Add Products', 'Sales History'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            style={navButtonStyle(activeTab === tab)}
          >
            {tab === 'Sales History' ? '📜 History' : tab}
          </button>
        ))}
      </nav>

      {/* ডাইনামিক কন্টেন্ট এরিয়া */}
      <main style={mainArea}>
        {activeTab === 'Dashboard' && (
          <Dashboard inventory={inventory} salesHistory={salesHistory} />
        )}
        
        {activeTab === 'Bill' && (
          <BillingSystem inventory={inventory} onBillComplete={handleBillComplete} />
        )}

        {activeTab === 'Products List' && (
          <ProductList inventory={inventory} onUpdate={updateInventory} />
        )}

        {activeTab === 'Add Products' && (
          <AddProductForm onAdd={handleAddProduct} />
        )}

        {activeTab === 'Sales History' && (
          <SalesHistory sales={salesHistory} />
        )}
      </main>
    </div>
  );
}

// ইন-লাইন স্টাইলস (সহজ রাখার জন্য)
const navContainer = { display: 'flex', justifyContent: 'center', gap: '8px', borderBottom: '2px solid #eee', paddingBottom: '10px' };
const navButtonStyle = (isActive) => ({
  padding: '10px 15px', cursor: 'pointer', border: 'none', borderRadius: '8px',
  background: isActive ? '#2c3e50' : '#ecf0f1', color: isActive ? '#fff' : '#2c3e50', fontWeight: 'bold'
});
const mainArea = { marginTop: '20px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };

export default App;