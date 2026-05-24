import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import BatchForm from './BatchForm';
import BatchTable from './BatchTable';

const BatchCard = () => {
  const [formData, setFormData] = useState({ style: '', color: '', qty: '', weight: '' });
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const printRef = useRef();

  const totalQty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const totalWeight = items.reduce((sum, item) => sum + Number(item.weight || 0), 0);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setItems(items.map(item => item.id === editId ? { ...formData, id: editId } : item));
      setEditId(null);
    } else {
      setItems([...items, { ...formData, id: Date.now() }]);
    }
    setFormData({ style: '', color: '', qty: '', weight: '' });
  };

  const deleteItem = (id) => setItems(items.filter(item => item.id !== id));
  
  const startEdit = (item) => {
    setFormData({ style: item.style, color: item.color, qty: item.qty, weight: item.weight });
    setEditId(item.id);
  };

  const downloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);
    pdf.save(`Batch-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 font-sans">
      <BatchForm formData={formData} handleInput={handleInput} handleSubmit={handleSubmit} editId={editId} />
      
      {items.length > 0 && (
        <div className="mt-10 max-w-4xl mx-auto flex flex-col items-center">
          <button onClick={downloadPDF} className="mb-6 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
            📥 PDF ডাউনলোড করুন
          </button>
          <BatchTable ref={printRef} items={items} totalQty={totalQty} totalWeight={totalWeight} startEdit={startEdit} deleteItem={deleteItem} />
        </div>
      )}
    </div>
  );
};

export default BatchCard;