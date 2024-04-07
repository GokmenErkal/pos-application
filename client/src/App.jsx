import { BrowserRouter, Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage";
import Cartpage from "./pages/Cartpage";
import BillPage from "./pages/BillPage";
import Register from "./pages/auth/Register";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Login from "./pages/auth/Login";

function App() {
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/bills" element={<BillPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
