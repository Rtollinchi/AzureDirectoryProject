import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserSearchForm from "./components/UserSearchForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<UserSearchForm />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
