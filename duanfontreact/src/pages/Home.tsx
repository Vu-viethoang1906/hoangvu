import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from  "../auth/useKeycloak";

const Home: React.FC = () => {
  const { authenticated, username, login, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

  useEffect(() => {
    if (!token) {
      // Nếu không có token thì chuyển về login
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>🏠 Home Page</h2>
      {isLoggedIn ? (
        <>
          <p className="text-success">
            ✅ Bạn đã đăng nhập thành công!
          </p>
          <ul>
            <li><b>Email:</b> {email}</li>
            <li><b>User ID:</b> {userId}</li>
            <li><b>Token:</b> <code>{token}</code></li>
          </ul>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            🚪 Đăng xuất
          </button>
        </>
      ) : (
        <p className="text-danger">❌ Chưa đăng nhập, vui lòng quay lại Login</p>
      )}
    </div>
  );
};

export default Home;
