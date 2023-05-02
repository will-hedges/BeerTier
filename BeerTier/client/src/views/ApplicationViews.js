import React from "react";
import { Routes, Route } from "react-router-dom";
import BeerList from "../components/BeerList";
import Hello from "../components/Hello";
import LoginPage from "../pages/LoginPage";

export default function ApplicationViews() {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Hello />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="beer" index element={<BeerList />} />
          <Route path="/beer/me" element={<Hello />} />
          <Route path="/beer/new" element={<Hello />} />
        </Route>
      </Routes>
    </main>
  );
}
