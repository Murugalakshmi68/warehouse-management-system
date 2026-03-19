function Dashboard() {
  return (
    <div>

      {/* HEADER */}
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      {/* CARDS */}
      <div style={cardContainer}>
        <Card title="Products" value="120" />
        <Card title="Warehouses" value="5" />
        <Card title="Inventory Items" value="560" />
        <Card title="Low Stock Alerts" value="12" />
      </div>

      {/* MODULE OVERVIEW */}
      <div style={section}>
        <h3>System Overview</h3>
        <p>
          Manage products, track warehouse capacity, and monitor inventory levels efficiently.
        </p>
      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={cardStyle}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "30px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const section = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
};

export default Dashboard;