import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StockManagementApp() {
  // ১. স্টেট ম্যানেজমেন্ট
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', unit: 'pcs' });

  // ২. ডাটা লোড করা
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('myShopInventory')) || [];
    setInventory(savedData);
  }, []);

  // ৩. ইনভেন্টরি সেভ করা
  const saveToLocal = (data) => {
    setInventory(data);
    localStorage.setItem('myShopInventory', JSON.stringify(data));
  };

  // ৪. লজিক ফাংশনসমূহ
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return toast.error("সবগুলো ঘর পূরণ করুন!");
    
    const updated = [...inventory, { ...newProduct, id: uuidv4(), price: parseFloat(newProduct.price), stock: parseFloat(newProduct.stock) }];
    saveToLocal(updated);
    setNewProduct({ name: '', price: '', stock: '', unit: 'pcs' });
    toast.success("পণ্য যোগ হয়েছে!");
    setActiveTab('Products List');
  };

  const addToBill = (product) => {
    if (product.stock <= 0) return toast.error("স্টক নেই!");
    const qty = prompt(`${product.name} পরিমাণ লিখুন:`, "1");
    if (!qty || isNaN(qty) || qty > product.stock) return toast.error("ভুল পরিমাণ বা স্টকের চেয়ে বেশি!");
    
    setSelectedItems([...selectedItems, { ...product, billQty: parseFloat(qty), subtotal: product.price * qty, billId: uuidv4() }]);
    toast.info("বিলে যোগ হয়েছে");
  };

  const printBill = () => {
    if (!customerName) return toast.warn("কাস্টমারের নাম লিখুন");
    const doc = new jsPDF();
    doc.text("CASH MEMO", 14, 20);
    doc.text(`Customer: ${customerName}`, 14, 30);
    
    const rows = selectedItems.map((item, i) => [i + 1, item.name, item.billQty, item.price, item.subtotal]);
    doc.autoTable({ startY: 40, head: [['SL', 'Item', 'Qty', 'Rate', 'Total']], body: rows });
    
    doc.save(`${customerName}_bill.pdf`); // সরাসরি ডাউনলোড হবে অ্যান্ড্রয়েডে

    // স্টক আপডেট
    const updatedInv = inventory.map(inv => {
      const sold = selectedItems.find(s => s.id === inv.id);
      return sold ? { ...inv, stock: inv.stock - sold.billQty } : inv;
    });
    saveToLocal(updatedInv);
    setSelectedItems([]);
    setCustomerName('');
    toast.success("বিল সম্পন্ন ও স্টক আপডেট হয়েছে!");
  };

  // ৫. সাব-কম্পোনেন্টসমূহ (Views)
  const Dashboard = () => {
    const totalItems = inventory.length;
    const totalStockValue = inventory.reduce((acc, i) => acc + (i.price * i.stock), 0);
    const lowStockItems = inventory.filter(i => i.stock <= 5).length;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '20px' }}>
        <div style={cardStyle('#3498db')}><h3>{totalItems}</h3><p>Total Products</p></div>
        <div style={cardStyle('#27ae60')}><h3>{totalStockValue.toFixed(2)}</h3><p>Stock Value (BDT)</p></div>
        <div style={cardStyle('#e74c3c')}><h3>{lowStockItems}</h3><p>Low Stock Items</p></div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', fontFamily: 'sans-serif', padding: '10px' }}>
      <ToastContainer position="top-center" autoClose={1500} />
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>📦 Stock Management</h2>

      {/* নেভিগেশন মেনু (ছবির মত) */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        {['Dashboard', 'Bill', 'Products List', 'Add Products'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={navButtonStyle(activeTab === tab)}>{tab}</button>
        ))}
      </nav>

      {/* ডাইনামিক কন্টেন্ট */}
      {activeTab === 'Dashboard' && <Dashboard />}

      {activeTab === 'Bill' && (
        <div style={{ background: '#fff', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>Create New Bill</h4>
          <input type="text" placeholder="কাস্টমারের নাম" value={customerName} onChange={e => setCustomerName(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="পণ্য খুঁজুন..." onChange={e => setSearchTerm(e.target.value)} style={inputStyle} />
          {searchTerm && (
            <div style={searchListStyle}>
              {inventory.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                <div key={p.id} onClick={() => addToBill(p)} style={{ padding: '8px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                  {p.name} (Stock: {p.stock}) - {p.price} BDT
                </div>
              ))}
            </div>
          )}
          <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa' }}><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
            <tbody>
              {selectedItems.map(item => (
                <tr key={item.billId} style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>
                  <td>{item.name}</td><td>{item.billQty}</td><td>{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={printBill} disabled={selectedItems.length === 0} style={primaryButtonStyle}>Print PDF & Save</button>
        </div>
      )}

      {activeTab === 'Products List' && (
        <div>
          <h4>Current Inventory</h4>
          {inventory.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee', background: item.stock <= 5 ? '#fff5f5' : 'none' }}>
              <span><b>{item.name}</b><br/><small>Price: {item.price} | Stock: {item.stock} {item.unit}</small></span>
              <button onClick={() => { const up = inventory.filter(i => i.id !== item.id); saveToLocal(up); }} style={{ color: 'red', border: 'none', background: 'none' }}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Add Products' && (
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4>Add New Product</h4>
          <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Total Stock" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={inputStyle} />
          <select value={newProduct.unit} onChange={e => setNewProduct({...newProduct, unit: e.target.value})} style={inputStyle}>
            <option value="pcs">Pcs</option><option value="kg">Kg</option>
          </select>
          <button type="submit" style={primaryButtonStyle}>Save to Inventory</button>
        </form>
      )}
    </div>
  );
}

// স্টাইলস
const navButtonStyle = (active) => ({
  padding: '10px 15px', cursor: 'pointer', border: 'none', borderRadius: '5px',
  background: active ? '#2c3e50' : '#ecf0f1', color: active ? '#fff' : '#2c3e50', fontWeight: 'bold'
});
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' };
const primaryButtonStyle = { width: '100%', padding: '12px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' };
const cardStyle = (bg) => ({ background: bg, color: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center' });
const searchListStyle = { border: '1px solid #ddd', borderRadius: '5px', maxHeight: '150px', overflowY: 'auto', marginBottom: '15px' };

export default StockManagementApp;