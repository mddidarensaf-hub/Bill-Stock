import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { v4 as uuidv4 } from 'uuid'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function Bill() {
  const [productsList, setProductsList] = useState([]); 
  const [newProduct, setNewProduct] = useState({ name: '', price: '', unit: 'pcs' }); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('myProducts')) || [];
    setProductsList(savedProducts);
  }, []);

  const handleAddProductToList = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      toast.error("সবগুলো ফিল্ড পূরণ করুন!");
      return;
    }

    const updatedList = [...productsList, { 
      ...newProduct, 
      id: uuidv4(), 
      price: parseFloat(newProduct.price) 
    }].sort((a, b) => a.name.localeCompare(b.name));

    setProductsList(updatedList);
    localStorage.setItem('myProducts', JSON.stringify(updatedList));
    setNewProduct({ name: '', price: '', unit: 'pcs' });
    toast.success("ইনভেন্টরিতে সেভ হয়েছে!");
  };

  const deleteFromInventory = (id) => {
    const filtered = productsList.filter(p => p.id !== id);
    setProductsList(filtered);
    localStorage.setItem('myProducts', JSON.stringify(filtered));
    toast.dark("পণ্যটি ডিলিট করা হয়েছে");
  };

  const addItemToBill = (product) => {
    const qtyInput = prompt(`${product.name}-এর পরিমাণ লিখুন:`, "1");
    if (qtyInput === null || qtyInput === "" || isNaN(qtyInput) || parseFloat(qtyInput) <= 0) return;

    const qty = parseFloat(qtyInput);
    setSelectedItems([...selectedItems, { 
      ...product, 
      billItemId: uuidv4(), 
      qty: qty,
      subtotal: product.price * qty
    }]);
    setSearchTerm('');
    toast.info("বিলে যোগ হয়েছে");
  };

  const removeFromBill = (billItemId) => {
    setSelectedItems(selectedItems.filter(item => item.billItemId !== billItemId));
  };

  const calculateTotal = () => selectedItems.reduce((acc, item) => acc + item.subtotal, 0);

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Cash Memo", 14, 15);
      doc.setFontSize(10);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);
      
      const tableRows = selectedItems.map((item, index) => [
        index + 1, 
        item.name, 
        `${item.qty} ${item.unit}`, 
        item.price.toFixed(2), 
        item.subtotal.toFixed(2)
      ]);

      autoTable(doc, {
        startY: 28,
        head: [["SL", "Product Name", "Qty", "Rate", "Amount"]],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [51, 51, 51] },
      });

      const finalY = doc.lastAutoTable.finalY || 35;
      doc.setFontSize(12);
      doc.text(`Total Amount: ${calculateTotal().toFixed(2)} BDT`, 14, finalY + 10);
      
      doc.save(`bill_${uuidv4().substring(0, 8)}.pdf`);
      
      setSelectedItems([]); 
      toast.success("PDF ডাউনলোড সম্পন্ন!");
    } catch (error) {
      console.error("PDF Error:", error);
      toast.error("PDF তৈরি করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <ToastContainer position="bottom-right" />
      <h2 style={{ textAlign: 'center', color: '#333' }}>🚀 Advanced Billing POS</h2>

      {/* Inventory Section */}
      <section style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ marginTop: 0 }}>ইনভেন্টরি এন্ট্রি</h4>
        <form onSubmit={handleAddProductToList} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" placeholder="পণ্যের নাম" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
            style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
          <input 
            type="number" placeholder="মূল্য" 
            value={newProduct.price} 
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
            style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
          <select 
            value={newProduct.unit} 
            onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})} 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="pcs">Pcs</option>
            <option value="kg">Kg</option>
            <option value="gm">Gm</option>
            <option value="ltr">Ltr</option>
          </select>
          <button type="submit" style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Add Product</button>
        </form>
      </section>

      {/* Search Section */}
      <div style={{ margin: '25px 0', position: 'relative' }}>
        <input 
          type="text" placeholder="পণ্য খুঁজুন (নাম লিখে)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '15px', border: '2px solid #007bff', borderRadius: '8px', boxSizing: 'border-box', fontSize: '16px' }}
        />
        {searchTerm && (
          <div style={{ border: '1px solid #ddd', background: '#fff', position: 'absolute', width: '100%', zIndex: 100, borderRadius: '0 0 8px 8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {productsList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <span onClick={() => addItemToBill(p)} style={{ cursor: 'pointer', flex: 1, fontWeight: '500' }}>{p.name} — {p.price} BDT</span>
                <button onClick={() => deleteFromInventory(p.id)} style={{ background: '#ff4d4d', border: 'none', color: '#fff', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px', fontSize: '12px' }}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Billing Table */}
      <div style={{ marginTop: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#007bff', color: '#fff' }}>
              <th style={{ padding: '12px' }}>SL</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Item Name</th>
              <th style={{ padding: '12px' }}>Qty</th>
              <th style={{ textAlign: 'right', padding: '12px' }}>Subtotal</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>কোনো আইটেম যোগ করা হয়নি</td></tr>
            ) : (
              selectedItems.map((item, index) => (
                <tr key={item.billItemId} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{index + 1}</td>
                  <td style={{ padding: '12px' }}>{item.name}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{item.qty} {item.unit}</td>
                  <td style={{ textAlign: 'right', padding: '12px' }}>{item.subtotal.toFixed(2)}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button onClick={() => removeFromBill(item.billItemId)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>❌</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <h2 style={{ color: '#333' }}>Total: {calculateTotal().toFixed(2)} BDT</h2>
          <button 
            onClick={generatePDF} 
            disabled={selectedItems.length === 0}
            style={{ 
              padding: '15px 40px', 
              background: selectedItems.length === 0 ? '#ccc' : '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '18px', 
              cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            Confirm & Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bill;