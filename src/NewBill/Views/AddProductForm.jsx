import React, { useState } from 'react';
import { InputField } from '../Components/InputField';

const AddProductForm = ({ onAdd }) => {
  // ১. মেমোরিতে 'buyingPrice' নতুন একটি ঘর যোগ করা হয়েছে
  const [product, setProduct] = useState({ 
    name: '', 
    buyingPrice: '', // কেনা দাম
    price: '',       // বিক্রয় মূল্য
    stock: '', 
    unit: 'pcs' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ২. সব ডেটাকে সংখ্যায় রূপান্তর করে পাঠানো হচ্ছে
    onAdd({ 
      ...product, 
      buyingPrice: parseFloat(product.buyingPrice),
      price: parseFloat(product.price), 
      stock: parseFloat(product.stock) 
    });

    // ৩. ফর্ম খালি করা
    setProduct({ name: '', buyingPrice: '', price: '', stock: '', unit: 'pcs' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
      <h4>নতুন পণ্য যোগ করুন</h4>
      
      <InputField 
        placeholder="পণ্যের নাম" 
        value={product.name} 
        onChange={e => setProduct({...product, name: e.target.value})} 
        required 
      />

      {/* কেনা দামের নতুন ইনপুট বক্স */}
      <InputField 
        type="number" 
        placeholder="কেনা দাম (প্রতি ইউনিট)" 
        value={product.buyingPrice} 
        onChange={e => setProduct({...product, buyingPrice: e.target.value})} 
        required 
      />

      <InputField 
        type="number" 
        placeholder="বিক্রয় মূল্য (প্রতি ইউনিট)" 
        value={product.price} 
        onChange={e => setProduct({...product, price: e.target.value})} 
        required 
      />

      <InputField 
        type="number" 
        placeholder="স্টক পরিমাণ" 
        value={product.stock} 
        onChange={e => setProduct({...product, stock: e.target.value})} 
        required 
      />

      <select 
        style={selectStyle} 
        value={product.unit} 
        onChange={e => setProduct({...product, unit: e.target.value})}
      >
        <option value="pcs">Pcs</option>
        <option value="kg">Kg</option>
        <option value="ltr">Ltr</option>
      </select>

      <button type="submit" style={saveButtonStyle}>
        ইনভেন্টরিতে সেভ করুন
      </button>
    </form>
  );
};

// স্টাইলসমূহ
const selectStyle = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff' };
const saveButtonStyle = { width: '100%', padding: '14px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' };

export default AddProductForm;