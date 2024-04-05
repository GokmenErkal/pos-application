import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import Cartpage from "./pages/Cartpage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
