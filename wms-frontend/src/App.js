import { BrowserRouter, Routes, Route } from "react-router-dom";
import StorageBins from "./pages/StorageBins";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bins" element={<StorageBins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;