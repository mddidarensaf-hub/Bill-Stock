import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BillingSystem = ({ inventory, onBillComplete }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [tempBillData, setTempBillData] = useState(null);

  const addToBill = (product) => {
    if (product.stock <= 0) return toast.error("স্টক নেই!");
    
    const qty = prompt(`${product.name} পরিমাণ দিন (স্টক: ${product.stock}):`, "1");
    const numQty = parseFloat(qty);

    if (!qty || isNaN(numQty) || numQty <= 0 || numQty > product.stock) {
      return toast.error("সঠিক পরিমাণ দিন!");
    }

    // আইটেমটি অলরেডি লিস্টে থাকলে শুধু পরিমাণ বাড়িয়ে দিন
    const existingIndex = selectedItems.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingIndex].billQty += numQty;
      updatedItems[existingIndex].subtotal = updatedItems[existingIndex].billQty * product.price;
      setSelectedItems(updatedItems);
    } else {
      const newItem = {
        ...product,
        billQty: numQty,
        subtotal: product.price * numQty,
        profit: (product.price - (product.buyingPrice || 0)) * numQty,
        billId: uuidv4()
      };
      setSelectedItems([...selectedItems, newItem]);
    }
    setSearchTerm('');
  };

  const removeItem = (billId) => {
    setSelectedItems(selectedItems.filter(item => item.billId !== billId));
  };

  const handleBillFinalize = () => {
    if (!customerName) return toast.warn("কাস্টমারের নাম লিখুন");
    if (selectedItems.length === 0) return toast.warn("কোনো পণ্য সিলেক্ট করেননি");

    const total = selectedItems.reduce((acc, i) => acc + i.subtotal, 0);
    const profit = selectedItems.reduce((acc, i) => acc + i.profit, 0);
    
    setTempBillData({ items: selectedItems, customer: customerName, total, profit });
    setShowOptions(true);
  };

  const generatePDF = (action) => {
    const { items, customer, total, profit } = tempBillData;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text("CASH MEMO", 105, 15, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Customer: ${customer}`, 14, 25);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);
    
    const rows = items.map((item, i) => [
      i + 1, 
      item.name, 
      item.billQty, 
      item.price.toFixed(2), 
      item.subtotal.toFixed(2)
    ]);

    doc.autoTable({
      startY: 40,
      head: [['SL', 'Item Name', 'Qty', 'Rate', 'Total']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [44, 62, 80] }
    });
    
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Grand Total: ${total.toFixed(2)} BDT`, 140, finalY);

    if (action === 'print') {
      window.open(doc.output('bloburl'), '_blank');
    } else {
      doc.save(`${customer}_bill.pdf`);
    }

    onBillComplete(items, customer, total, profit);
    resetForm();
  };

  const resetForm = () => {
    setShowOptions(false);
    setSelectedItems([]);
    setCustomerName('');
    setTempBillData(null);
  };

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '10px' }}>
      <h4>🛒 বিলিং সেকশন</h4>
      
      <input 
        placeholder="কাস্টমারের নাম" 
        value={customerName} 
        onChange={e => setCustomerName(e.target.value)} 
        style={inputStyle} 
      />
      
      <div style={{ position: 'relative' }}>
        <input 
          placeholder="পণ্য খুঁজুন..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          style={inputStyle} 
        />
        {searchTerm && (
          <div style={dropdownStyle}>
            {inventory
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(p => (
                <div key={p.id} onClick={() => addToBill(p)} style={itemStyle}>
                  {p.name} - {p.price} BDT (স্টক: {p.stock})
                </div>
              ))}
          </div>
        )}
      </div>

      {/* সিলেক্টেড আইটেম লিস্ট */}
      <div style={{ marginTop: '20px' }}>
        <h5>নির্বাচিত পণ্যসমূহ:</h5>
        {selectedItems.map(item => (
          <div key={item.billId} style={selectedItemRow}>
            <span>{item.name} ({item.billQty} pc)</span>
            <span>{item.subtotal} BDT</span>
            <button onClick={() => removeItem(item.billId)} style={removeBtn}>×</button>
          </div>
        ))}
        {selectedItems.length > 0 && (
            <div style={{ fontWeight: 'bold', textAlign: 'right', marginTop: '10px' }}>
                মোট: {selectedItems.reduce((acc, i) => acc + i.subtotal, 0)} BDT
            </div>
        )}
      </div>

      <button 
        onClick={handleBillFinalize} 
        disabled={selectedItems.length === 0} 
        style={primaryButtonStyle}
      >
        বিল চেকআউট করুন
      </button>

      {showOptions && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h4>কি করতে চান?</h4>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
              <button onClick={() => generatePDF('print')} style={btn('#3498db')}>🖨️ প্রিন্ট</button>
              <button onClick={() => generatePDF('download')} style={btn('#2ecc71')}>📥 ডাউনলোড</button>
              <button onClick={() => setShowOptions(false)} style={btn('#95a5a6')}>বাতিল</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// অতিরিক্ত বা পরিবর্তিত স্টাইলস
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' };
const dropdownStyle = { position: 'absolute', width: '100%', border: '1px solid #ddd', borderRadius: '5px', maxHeight: '150px', overflowY: 'auto', background: '#fff', zIndex: 10 };
const itemStyle = { padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' };
const selectedItemRow = { display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '8px', marginBottom: '5px', borderRadius: '5px', alignItems: 'center', fontSize: '14px' };
const removeBtn = { background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', width: '24px', height: '24px' };
const primaryButtonStyle = { width: '100%', padding: '12px', background: '#2c3e50', color: '#fff', borderRadius: '5px', marginTop: '10px', cursor: 'pointer', border: 'none' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContent = { background: '#fff', padding: '30px', borderRadius: '15px', textAlign: 'center', minWidth: '300px' };
const btn = (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' });

export default BillingSystem;