import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Table from "./pages/Table";
import Progress from "./pages/Progress";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Table />} />
          <Route path="/progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
