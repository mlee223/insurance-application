import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AddApplication from "./pages/AddApplication";
import Application from "./pages/Application";
import ApplicationsList from "./pages/ApplicationsList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/applications" className="navbar-brand">
          Hugo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/applications"} className="nav-link">
              Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ApplicationsList />} />
          <Route path="/applications" element={<ApplicationsList />} />
          <Route path="/add" element={<AddApplication />} />
          <Route path="/applications/:id" element={<Application />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
