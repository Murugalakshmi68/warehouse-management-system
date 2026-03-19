import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import Warehouses from "./pages/Warehouses.js";
import Inventory from "./pages/Inventory.js";
import StorageBins from "./pages/StorageBins";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={mainStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/bins" element={<StorageBins />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const mainStyle = {
  flex: 1,
  padding: "20px",
  background: "#f1f5f9",
  minHeight: "100vh",
};

export default App;