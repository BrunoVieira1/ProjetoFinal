import { BrowserRouter, Route, Routes } from "react-router-dom";
import Graphs from "./screens/graphs/graphs";
import Products from "./screens/products";
import Login from "./screens/login";
import Orders from "./screens/orders";
import Inout from "./screens/inout";
import Stock from "./screens/stock";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Graphs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/debtors" element={<Orders />} />
        <Route path="/inout" element={<Inout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
