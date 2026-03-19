import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // Add or Update Product
  const saveProduct = () => {
    if (!name || !description) {
      alert("All fields required");
      return;
    }

    if (editId) {
      // Update
      const updated = products.map((p) =>
        p.id === editId ? { ...p, name, description } : p
      );
      setProducts(updated);
      setEditId(null);
    } else {
      // Add
      const newProduct = {
        id: Date.now(),
        name,
        description,
      };
      setProducts([...products, newProduct]);
    }

    setName("");
    setDescription("");
  };

  // Delete
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Edit
  const editProduct = (product) => {
    setName(product.name);
    setDescription(product.description);
    setEditId(product.id);
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      {/* FORM CARD */}
      <div
        style={{
          marginBottom: "20px",
          padding: "20px",
          maxWidth: "400px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3>{editId ? "Update Product" : "Add New Product"}</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <button onClick={saveProduct} style={buttonStyle}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* TABLE CARD */}
      <div style={tableCard}>
        <h3>All Products</h3>

        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products available</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#2563eb", color: "white" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Description</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ textAlign: "center" }}>
                  <td style={td}>{product.id}</td>
                  <td style={td}>{product.name}</td>
                  <td style={td}>{product.description}</td>
                  <td style={td}>
                    <button
                      onClick={() => editProduct(product)}
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      style={deleteBtn}
                    >
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

// 🎨 Styles
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

export default Products;