import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Table from "./pages/Table";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
