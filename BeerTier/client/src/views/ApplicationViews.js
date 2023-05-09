import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "../pages/Hello";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BeersPage from "../pages/BeersPage";
import BeerDetailsPage from "../pages/BeerDetailsPage";
import BeerForm from "../pages/BeerForm";
import BreweriesPage from "../pages/BreweriesPage";
import BreweryDetailsPage from "../pages/BreweryDetailsPage";
import StylesPage from "../pages/StylesPage";

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
          <Route path="brewery/:id" element={<BreweryDetailsPage />} />
          <Route path="style" element={<StylesPage />} />
        </Route>
      </Routes>
    </main>
  );
}
