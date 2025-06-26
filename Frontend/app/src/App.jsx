import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

function RoutesWrapper() {
  const { user } = React.useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
