import React from "react";
import { Routes, Route } from "react-router-dom";
import BeerList from "../components/BeerList";
import Hello from "../components/Hello";

export default function ApplicationViews() {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Hello />} />
          <Route path="beer" index element={<BeerList />} />
        </Route>
      </Routes>
    </main>
  );
}
