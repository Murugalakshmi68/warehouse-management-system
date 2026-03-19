import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxes,
  FaWarehouse,
  FaClipboardList,
  FaLayerGroup
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { path: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/products", label: "Products", icon: <FaBoxes /> },
    { path: "/warehouses", label: "Warehouses", icon: <FaWarehouse /> },
    { path: "/inventory", label: "Inventory", icon: <FaClipboardList /> },
    { path: "/bins", label: "Storage Bins", icon: <FaLayerGroup /> }, // ✅ ADDED
  ];

  return (
    <div style={sidebarStyle}>
      <h2 style={{ color: "#fff", marginBottom: "30px" }}>WMS</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            ...linkStyle,
            background:
              location.pathname === item.path ? "#2563eb" : "transparent",
            color:
              location.pathname === item.path ? "#fff" : "#cbd5e1",
          }}
        >
          {item.icon} {item.label}
        </Link>
      ))}
    </div>
  );
}

const sidebarStyle = {
  width: "230px",
  height: "100vh",
  background: "#0f172a",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  borderRadius: "6px",
  textDecoration: "none",
  marginBottom: "10px",
};

export default Sidebar;