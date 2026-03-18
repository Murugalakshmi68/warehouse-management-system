import { useEffect, useState } from "react";
import API from "../services/api";

function StorageBins() {
  const [bins, setBins] = useState([]);
  const [binCode, setBinCode] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const res = await API.get("/bins");
      setBins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveBin = async () => {
    if (!binCode || !capacity) {
      alert("All fields required");
      return;
    }

    try {
      if (editId) {
        await API.put(`/bins/${editId}`, {
          binCode,
          capacity: parseInt(capacity),
        });
      } else {
        await API.post("/bins", {
          binCode,
          capacity: parseInt(capacity),
        });
      }

      setBinCode("");
      setCapacity("");
      setEditId(null);
      fetchBins();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBin = async (id) => {
    try {
      await API.delete(`/bins/${id}`);
      fetchBins();
    } catch (err) {
      console.error(err);
    }
  };

  const editBin = (bin) => {
    setBinCode(bin.binCode);
    setCapacity(bin.capacity);
    setEditId(bin.id);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      {/* TITLE */}
      <h1 style={{ textAlign: "center" }}>Warehouse Storage Bins</h1>

      {/* FORM CARD */}
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>{editId ? "Update Bin" : "Add New Bin"}</h3>

        <input
          type="text"
          placeholder="Bin Code"
          value={binCode}
          onChange={(e) => setBinCode(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={saveBin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editId ? "Update Bin" : "Add Bin"}
        </button>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "80%",
          margin: "auto",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th>Bin Code</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bins
            .filter((bin) => bin.binCode)
            .map((bin) => (
              <tr key={bin.id} style={{ textAlign: "center" }}>
                <td>{bin.id}</td>
                <td>{bin.binCode}</td>
                <td>{bin.capacity}</td>
                <td>
                  <button
                    onClick={() => editBin(bin)}
                    style={{
                      marginRight: "5px",
                      padding: "5px",
                      backgroundColor: "orange",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBin(bin.id)}
                    style={{
                      padding: "5px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default StorageBins;