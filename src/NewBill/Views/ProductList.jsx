import React from 'react';
import { toast } from 'react-toastify';

const ProductList = ({ inventory, onUpdate }) => {

  // পণ্য ডিলিট করার ফাংশন
  const handleDelete = (id) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?")) {
      const filteredInventory = inventory.filter(item => item.id !== id);
      onUpdate(filteredInventory); // Parent-কে আপডেট পাঠানো
      toast.error("পণ্যটি মুছে ফেলা হয়েছে!");
    }
  };

  return (
    <div>
      <h4 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>পণ্য তালিকা (Inventory)</h4>
      
      {inventory.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>কোনো পণ্য পাওয়া যায়নি!</p>
      ) : (
        <div style={listContainer}>
          {inventory.map((item) => (
            <div key={item.id} style={itemCard(item.stock)}>
              <div style={infoStyle}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</span>
                <small style={{ color: '#666' }}>
                  দাম: <b>{item.price} BDT</b> | স্টক: <b>{item.stock} {item.unit}</b>
                </small>
              </div>
              
              <button 
                onClick={() => handleDelete(item.id)} 
                style={deleteButtonStyle}
              >
                <i className="fa fa-trash"></i> ডিলিট
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// স্টাইলসমূহ (মানুষের ভাষায়: এই কোডগুলো লিস্টকে সুন্দর দেখাবে)
const listContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '15px'
};

const itemCard = (stock) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  background: stock <= 5 ? '#fff5f5' : '#fff', // স্টক ৫ এর কম হলে লালচে আভা
  borderLeft: stock <= 5 ? '5px solid #e74c3c' : '5px solid #2ecc71'
});

const infoStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const deleteButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#e74c3c',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px'
};

export default ProductList;