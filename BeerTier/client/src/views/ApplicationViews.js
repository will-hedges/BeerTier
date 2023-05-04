import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllBeersPage from "../pages/AllBeersPage";
import Hello from "../pages/Hello";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BeerDetailsPage from "../pages/BeerDetailsPage";
import NewBeerPage from "../pages/NewBeerPage";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Hello />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="beer" element={<AllBeersPage />} />
          <Route path="beer/:id" element={<BeerDetailsPage />} />
          <Route
            path="/beer/new"
            element={isLoggedIn ? <NewBeerPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/beer/me"
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </main>
  );
}
