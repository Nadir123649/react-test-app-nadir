import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import authRoutes from "./authentication";

export default function MainRoute() {
  return (
    <Router>
      <Routes>
        {authRoutes.map((item, index) => (
          <Route
            key={index}
            exact
            path={item.path}
            element={<item.component />}
          />
        ))}
      </Routes>
    </Router>
  );
}
