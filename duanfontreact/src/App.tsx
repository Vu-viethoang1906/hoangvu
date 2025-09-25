// App.tsx
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

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.25, ease: easeInOut },
};

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      if (location.pathname === "/login") navigate("/dashboard");
    } else {
      if (location.pathname !== "/login") navigate("/login");
    }
  }, [token, location.pathname, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<motion.div {...pageTransition}><Login /></motion.div>} />
        <Route path="/login-codegym" element={<motion.div {...pageTransition}><CodeGymLogin /></motion.div>} />
        <Route path="/home" element={token ? <motion.div {...pageTransition}><Home /></motion.div> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={token ? <motion.div {...pageTransition}><Dashboard /></motion.div> : <Navigate to="/login" replace />} />
        <Route path="/projects" element={token ? <motion.div {...pageTransition}><Projects /></motion.div> : <Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <AnimatedRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
