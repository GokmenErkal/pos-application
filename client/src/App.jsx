import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import HomePage from "./pages/HomePage";
import Cartpage from "./pages/Cartpage";
import BillPage from "./pages/BillPage";
import Register from "./pages/auth/Register";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouteControl>
                <HomePage />
              </RouteControl>
            }
          />
          <Route
            path="/cart"
            element={
              <RouteControl>
                <Cartpage />
              </RouteControl>
            }
          />
          <Route
            path="/bills"
            element={
              <RouteControl>
                <BillPage />
              </RouteControl>
            }
          />
          <Route
            path="/customers"
            element={
              <RouteControl>
                <CustomerPage />
              </RouteControl>
            }
          />
          <Route
            path="/statistic"
            element={
              <RouteControl>
                <StatisticPage />
              </RouteControl>
            }
          />
          <Route
            path="/products"
            element={
              <RouteControl>
                <ProductPage />
              </RouteControl>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children
  }
  else {
    return <Navigate to={"/login"} />
  }
}