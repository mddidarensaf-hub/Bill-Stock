import React, { forwardRef } from 'react';

const BatchTable = forwardRef(({ items, totalQty, totalWeight, startEdit, deleteItem }, ref) => (
  <div ref={ref} className="bg-white w-full p-8 border border-slate-300 text-black">
    <h2 className="text-2xl font-black text-center mb-6 uppercase">Inventory Batch List</h2>
    <table className="w-full border-2 border-black border-collapse">
      <thead>
        <tr className="bg-slate-100">
          <th className="border-2 border-black p-2 text-left">Style</th>
          <th className="border-2 border-black p-2 text-left">Color</th>
          <th className="border-2 border-black p-2 text-center">Qty</th>
          <th className="border-2 border-black p-2 text-center">Weight</th>
          <th data-html2canvas-ignore className="border-2 border-black p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="text-md">
            <td className="border-2 border-black p-2 font-bold">{item.style}</td>
            <td className="border-2 border-black p-2">{item.color}</td>
            <td className="border-2 border-black p-2 text-center">{item.qty} Pcs</td>
            <td className="border-2 border-black p-2 text-center font-bold">{item.weight} KG</td>
            <td data-html2canvas-ignore className="border-2 border-black p-2 text-center space-x-2">
              <button onClick={() => startEdit(item)} className="bg-amber-500 text-white px-2 py-1 rounded text-xs">Edit</button>
              <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Del</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="bg-slate-200">
        <tr className="font-black">
          <td colSpan="2" className="border-2 border-black p-2 text-right">Total:</td>
          <td className="border-2 border-black p-2 text-center">{totalQty} Pcs</td>
          <td className="border-2 border-black p-2 text-center">{totalWeight.toFixed(2)} KG</td>
          <td data-html2canvas-ignore className="border-2 border-black p-2"></td>
        </tr>
      </tfoot>
    </table>
  </div>
));

export default BatchTable;