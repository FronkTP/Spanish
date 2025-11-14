import "./App.css";
import Home from "./pages/Home";
import Table from "./pages/Table";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
