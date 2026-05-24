import React from 'react';

const SalesHistory = ({ sales }) => {
  // সর্বমোট হিসাব
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalProfit = sales.reduce((acc, sale) => acc + sale.profit, 0);

  return (
    <div style={{ padding: '10px' }}>
      <div style={summaryBox}>
        <div style={{color: '#27ae60'}}>💰 মোট বিক্রি: {totalRevenue.toFixed(2)} BDT</div>
        <div style={{color: '#e67e22'}}>📈 মোট লাভ: {totalProfit.toFixed(2)} BDT</div>
      </div>

      <h4>সাম্প্রতিক বিক্রয়সমূহ</h4>
      {sales.length === 0 ? <p>কোনো রেকর্ড পাওয়া যায়নি।</p> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={historyTableStyle}>
            <thead>
              <tr>
                <th>তারিখ</th>
                <th>কাস্টমার</th>
                <th>মোট টাকা</th>
                <th>লাভ</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.date}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.total.toFixed(2)}</td>
                  <td style={{ color: 'green', fontWeight: 'bold' }}>
                    +{sale.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// স্টাইলস
const summaryBox = {
  display: 'flex', justifyContent: 'space-around', background: '#f8f9fa',
  padding: '15px', borderRadius: '10px', marginBottom: '20px', fontWeight: 'bold',
  border: '1px solid #ddd'
};
const historyTableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px' };

export default SalesHistory;