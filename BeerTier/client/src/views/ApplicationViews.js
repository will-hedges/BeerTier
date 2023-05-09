import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BeersPage from "../pages/BeersPage";
import Hello from "../pages/Hello";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BeerDetailsPage from "../pages/BeerDetailsPage";
import BeerForm from "../pages/BeerForm";
import StylesPage from "../pages/StylesPage";
import BreweriesPage from "../pages/BreweriesPage";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Hello />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="beer" element={<BeersPage />} />
          <Route
            path="beer/new"
            element={isLoggedIn ? <BeerForm /> : <Navigate to="/login" />}
          />
          <Route path="beer/:id" element={<BeerDetailsPage />} />
          <Route
            path="beer/edit/:beerId"
            element={isLoggedIn ? <BeerForm /> : <Navigate to="/login" />}
          />
          <Route path="brewery" element={<BreweriesPage />} />
          <Route path="style" element={<StylesPage />} />
        </Route>
      </Routes>
    </main>
  );
}
