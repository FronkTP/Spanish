import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Table from "./pages/Table";
import Progress from "./pages/Progress";
import PracticeLayout from "./pages/practice/PracticeLayout";
import Practice from "./pages/practice/Practice";
import ListeningPractice from "./pages/practice/ListeningPractice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Table />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/practice" element={<PracticeLayout />}>
            <Route index element={<Practice />} />
            <Route path="listening" element={<ListeningPractice />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
