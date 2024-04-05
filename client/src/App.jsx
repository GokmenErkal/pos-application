import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import Cartpage from "./pages/Cartpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/cart" element={<Cartpage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
