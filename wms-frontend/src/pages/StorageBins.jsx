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

  // ✅ ADD or UPDATE
  const saveBin = async () => {
    try {
      if (editId) {
        // UPDATE
        await API.put(`/bins/${editId}`, {
          binCode,
          capacity: parseInt(capacity),
        });
      } else {
        // ADD
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

  // ✅ DELETE
  const deleteBin = async (id) => {
    try {
      await API.delete(`/bins/${id}`);
      fetchBins();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ EDIT (fill form)
  const editBin = (bin) => {
    setBinCode(bin.binCode);
    setCapacity(bin.capacity);
    setEditId(bin.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Storage Bins</h2>

      {/* FORM */}
      <input
        placeholder="Bin Code"
        value={binCode}
        onChange={(e) => setBinCode(e.target.value)}
      />

      <input
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

      <button onClick={saveBin}>
        {editId ? "Update Bin" : "Add Bin"}
      </button>

      {/* TABLE */}
      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bin Code</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bins
            .filter((bin) => bin.binCode)
            .map((bin) => (
              <tr key={bin.id}>
                <td>{bin.id}</td>
                <td>{bin.binCode}</td>
                <td>{bin.capacity}</td>
                <td>
                  <button onClick={() => editBin(bin)}>Edit</button>
                  <button onClick={() => deleteBin(bin.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default StorageBins;