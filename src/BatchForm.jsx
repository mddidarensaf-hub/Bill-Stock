import React from 'react';

const BatchForm = ({ formData, handleInput, handleSubmit, editId }) => (
  <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
    <h1 className="text-2xl font-black text-slate-800 mb-6 text-center uppercase tracking-tight">
      📦 Pant Batch Generator
    </h1>
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-500 uppercase">Style Name</label>
        <input name="style" className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.style} onChange={handleInput} required />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-500 uppercase">Color</label>
        <input name="color" className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.color} onChange={handleInput} required />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-500 uppercase">Quantity (Pcs)</label>
        <input name="qty" type="number" className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.qty} onChange={handleInput} required />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-slate-500 uppercase">Weight (KG)</label>
        <input name="weight" type="number" step="0.01" className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.weight} onChange={handleInput} required />
      </div>
      <button type="submit" className={`col-span-2 ${editId ? 'bg-orange-500' : 'bg-blue-600'} text-white font-bold py-3 rounded-lg shadow-lg transition-all`}>
        {editId ? 'আপডেট করুন (Update)' : 'তালিকায় যোগ করুন (+)'}
      </button>
    </form>
  </div>
);

export default BatchForm;