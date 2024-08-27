import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Graphs from "./screens/graphs";
import Stock from "./screens/stock";
import Login from "./screens/login";
import Orders from "./screens/orders";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Graphs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
