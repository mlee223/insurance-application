import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddApplication from "./pages/AddApplication";
import Application from "./pages/Application";
import ApplicationsList from "./pages/ApplicationsList";
import { DataStore } from "./data/global/store";

const AppRouter: React.FC = () => {
  return (
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<ApplicationsList />} />
        <Route path="/applications" element={<ApplicationsList />} />
        <Route path="/add" element={<AddApplication />} />
        <Route path="/applications/:id" element={<Application />} />
      </Routes>
    </div>
  );
};

const AppNavigationHeader: React.FC = () => {
  return (
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
  );
};

const App: React.FC = () => {
  const dataStore = DataStore({ enableDevTools: true });
  return (
    <Provider store={dataStore}>
      <AppNavigationHeader />
      <AppRouter />
    </Provider>
  );
};

export default App;
