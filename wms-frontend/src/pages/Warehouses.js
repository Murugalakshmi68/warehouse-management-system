import { useState } from "react";

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState(null);

  const saveWarehouse = () => {
    if (!name || !location) {
      alert("All fields required");
      return;
    }

    if (editId) {
      const updated = warehouses.map((w) =>
        w.id === editId ? { ...w, name, location } : w
      );
      setWarehouses(updated);
      setEditId(null);
    } else {
      const newWarehouse = {
        id: Date.now(),
        name,
        location,
      };
      setWarehouses([...warehouses, newWarehouse]);
    }

    setName("");
    setLocation("");
  };

  const deleteWarehouse = (id) => {
    setWarehouses(warehouses.filter((w) => w.id !== id));
  };

  const editWarehouse = (w) => {
    setName(w.name);
    setLocation(w.location);
    setEditId(w.id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Warehouses</h2>

      {/* FORM */}
      <div style={formCard}>
        <h3>{editId ? "Update Warehouse" : "Add Warehouse"}</h3>

        <input
          type="text"
          placeholder="Warehouse Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <button onClick={saveWarehouse} style={buttonStyle}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <div style={tableCard}>
        <h3>All Warehouses</h3>

        {warehouses.length === 0 ? (
          <p style={{ textAlign: "center" }}>No warehouses available</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#2563eb", color: "white" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Location</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {warehouses.map((w) => (
                <tr key={w.id} style={{ textAlign: "center" }}>
                  <td style={td}>{w.id}</td>
                  <td style={td}>{w.name}</td>
                  <td style={td}>{w.location}</td>
                  <td style={td}>
                    <button onClick={() => editWarehouse(w)} style={editBtn}>
                      Edit
                    </button>
                    <button onClick={() => deleteWarehouse(w.id)} style={deleteBtn}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// styles (reuse)
const formCard = {
  marginBottom: "20px",
  padding: "20px",
  maxWidth: "400px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableCard = {
  marginTop: "30px",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const th = { padding: "10px" };

const td = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const editBtn = {
  marginRight: "5px",
  padding: "5px 10px",
  background: "orange",
  border: "none",
  borderRadius: "4px",
};

const deleteBtn = {
  padding: "5px 10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

export default Warehouses;