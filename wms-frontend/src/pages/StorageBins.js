import { useState, useEffect } from "react";
import API from "../services/api";

function StorageBins() {
  const [bins, setBins] = useState([]);
  const [binCode, setBinCode] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // ✅ Fetch bins from backend
  const getBins = async () => {
    try {
      const res = await API.get("/bins");
      setBins(res.data);
    } catch (err) {
      setError("Failed to load bins");
    }
  };

  useEffect(() => {
    getBins();
  }, []);

  // ✅ Add / Update
  const saveBin = async () => {
    if (!binCode || !capacity) {
      setError("All fields required");
      return;
    }

    try {
      if (editId) {
        await API.put(`/bins/${editId}`, {
          binCode,
          capacity,
        });
        setEditId(null);
      } else {
        await API.post("/bins", {
          binCode,
          capacity,
        });
      }

      setBinCode("");
      setCapacity("");
      setError("");
      getBins();
    } catch (err) {
      setError("Operation failed");
    }
  };

  // ✅ Delete
  const deleteBin = async (id) => {
    try {
      await API.delete(`/bins/${id}`);
      getBins();
    } catch (err) {
      setError("Delete failed");
    }
  };

  // ✅ Edit
  const editBin = (bin) => {
    setBinCode(bin.binCode);
    setCapacity(bin.capacity);
    setEditId(bin.id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Storage Bins</h2>

      {/* ❌ Removed alert → ✅ UI Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM */}
      <div style={card}>
        <h3>{editId ? "Update Bin" : "Add Bin"}</h3>

        <input
          placeholder="Bin Code"
          value={binCode}
          onChange={(e) => setBinCode(e.target.value)}
          style={input}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          style={input}
        />

        <button onClick={saveBin} style={btn}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <div style={card}>
        <h3>All Bins</h3>

        {bins.length === 0 ? (
          <p>No bins available</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#2563eb", color: "white" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Bin Code</th>
                <th style={th}>Capacity</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bins.map((b) => (
                <tr key={b.id} style={{ textAlign: "center" }}>
                  <td style={td}>{b.id}</td>
                  <td style={td}>{b.binCode}</td>
                  <td style={td}>{b.capacity}</td>
                  <td style={td}>
                    <button onClick={() => editBin(b)} style={editBtn}>
                      Edit
                    </button>
                    <button onClick={() => deleteBin(b.id)} style={deleteBtn}>
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
const card = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
};

const th = { padding: "10px" };

const td = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const editBtn = {
  marginRight: "5px",
  background: "orange",
  border: "none",
  padding: "5px 10px",
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
};

export default StorageBins;