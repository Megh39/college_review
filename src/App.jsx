import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login"
import Dashboard from "./Components/Dashboard/Dashboard";
// import PrivateRoute from "./Components/PrivateRoute"; // Import PrivateRoute
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import { Navigate } from "react-router-dom";
import RankingNIRF from "./Components/RankingNIRF/RankingNIRF";
import Review from "./Components/Review/Review";
import Colleges from "./Components/Colleges/Colleges";
import CollegeDetails from "./Components/CollegeDetails/CollegeDetails";
import Reviews from "./Components/Reviews/Reviews";
// ✅ Function to check if user is logged in
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ Protected Route for Users
const PrivateRoute = ({ children }) => {
  const user = getUser();
  return user ? children : <Navigate to="/login" />;
};

// ✅ Protected Route for Admins
const AdminRoute = ({ children }) => {
  const user = getUser();
  return user && user.role === "admin" ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/nirfranking" element={<RankingNIRF />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/review" element={<PrivateRoute><Review /></PrivateRoute>} />
          <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
          <Route path="/college/:id" element={<PrivateRoute><CollegeDetails /></PrivateRoute>} />
          <Route path="/colleges" element={<PrivateRoute><Colleges /></PrivateRoute>} />
          <Route path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router >
    </>
  );
}
export default App;