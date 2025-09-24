import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import CodeGymLogin from "./pages/CodeGymLogin";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Filters from "./pages/Filters";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: 0.25,
    ease: easeInOut,
  },
};

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Checking navigation, pathname:", location.pathname, "Token:", token);
    if (token && location.pathname === "/login") {
      console.log("Redirecting to /dashboard due to existing token");
      navigate("/dashboard", { replace: true });
    } else if (!token && location.pathname !== "/login" && location.pathname !== "/login-codegym") {
      console.log("Redirecting to /login, no token");
      navigate("/login", { replace: true });
    }
  }, [location.pathname, token, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={
            <motion.div {...pageTransition}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/login-codegym"
          element={
            <motion.div {...pageTransition}>
              <CodeGymLogin />
            </motion.div>
          }
        />
        <Route
          path="/home"
          element={
            token ? (
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <motion.div {...pageTransition}>
                <Dashboard />
              </motion.div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            token ? (
              <motion.div {...pageTransition}>
                <Projects />
              </motion.div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/filters"
          element={
            token ? (
              <motion.div {...pageTransition}>
                <Filters />
              </motion.div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;