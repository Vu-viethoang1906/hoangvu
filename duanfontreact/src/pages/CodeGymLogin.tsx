import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/codegym-login.css"; // CSS riêng cho trang này

const CodeGymLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "user@codegym.vn" && password === "123456") {
      localStorage.setItem("token", "fake-codegym-token-abc123");
      localStorage.setItem("email", "user@codegym.vn"); // Lưu email để hiển thị trên dashboard
      localStorage.setItem("userId", "fake-user-id-001"); // Lưu userId giả lập
      toast.success("Đăng nhập thành công 🎉");
      navigate("/dashboard"); // Thay đổi từ /home thành /dashboard
    } else {
      toast.error("Sai username hoặc password ❌");
    }
  };

  return (
    <div className="codegym-login-container">
      <div className="login-box">
        <img src="/codegymlogo.png" alt="CodeGym Logo" className="logo" />

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-login">Đăng nhập</button>
        </form>

        <button
          className="btn-back"
          onClick={() => navigate("/login")}
        >
          Quay lại đăng nhập thường
        </button>
      </div>
    </div>
  );
};

export default CodeGymLogin;
