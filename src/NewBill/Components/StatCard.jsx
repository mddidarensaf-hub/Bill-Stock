// src/components/StatCard.js
export const StatCard = ({ value, label, color }) => (
  <div style={{ 
    background: color, 
    color: '#fff', 
    padding: '20px', 
    borderRadius: '10px', 
    textAlign: 'center' 
  }}>
    <h3 style={{ margin: 0, fontSize: '24px' }}>{value}</h3>
    <p style={{ margin: '5px 0 0', opacity: 0.9 }}>{label}</p>
  </div>
);