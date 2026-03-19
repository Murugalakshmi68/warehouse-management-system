import { useState } from "react";

function Inventory() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [bin, setBin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔹 Dummy Data (since no backend)
  const products = ["Laptop", "Mobile", "Keyboard"];
  const bins = ["A01", "A02", "B01"];

  const saveItem = () => {
    if (!product || !bin || !quantity) {
      alert("All fields required");
      return;
    }

    if (editId) {
      const updated = items.map((i) =>
        i.id === editId ? { ...i, product, bin, quantity } : i
      );
      setItems(updated);
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        product,
        bin,
        quantity,
      };
      setItems([...items, newItem]);
    }

    setProduct("");
    setBin("");
    setQuantity("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const editItem = (item) => {
    setProduct(item.product);
    setBin(item.bin);
    setQuantity(item.quantity);
    setEditId(item.id);
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ marginBottom: "20px" }}>Inventory</h2>

      {/* FORM CARD */}
      <div style={formCard}>
        <h3>{editId ? "Update Inventory" : "Add Inventory Item"}</h3>

        {/* Product Dropdown */}
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Product</option>
          {products.map((p, index) => (
            <option key={index} value={p}>{p}</option>
          ))}
        </select>

        {/* Bin Dropdown */}
        <select
          value={bin}
          onChange={(e) => setBin(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Storage Bin</option>
          {bins.map((b, index) => (
            <option key={index} value={b}>{b}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <button onClick={saveItem} style={buttonStyle}>
          {editId ? "Update Item" : "Add Item"}
        </button>
      </div>

      {/* TABLE */}
      <div style={tableCard}>
        <h3>Inventory List</h3>

        {items.length === 0 ? (
          <p style={{ textAlign: "center" }}>No inventory items</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#2563eb", color: "white" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Product</th>
                <th style={th}>Bin</th>
                <th style={th}>Quantity</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ textAlign: "center" }}>
                  <td style={td}>{item.id}</td>
                  <td style={td}>{item.product}</td>
                  <td style={td}>{item.bin}</td>
                  <td style={td}>{item.quantity}</td>
                  <td style={td}>
                    <button onClick={() => editItem(item)} style={editBtn}>
                      Edit
                    </button>
                    <button onClick={() => deleteItem(item.id)} style={deleteBtn}>
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

// 🎨 STYLES
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
  cursor: "pointer",
};

const deleteBtn = {
  padding: "5px 10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Inventory;