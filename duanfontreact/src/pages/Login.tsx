import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/login.css";
import { useAuth } from "../auth/useKeycloak";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // chỉ giữ login SSO
  const navigate = useNavigate();

  // Load email đã lưu khi component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  // Xử lý đăng nhập Local
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3005/api/login", {
        email,
        password,
      });

      const { success, data, message } = res.data;

      if (success && data?.token && data?.user) {
        const { token, user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("Type_login", "Local");

        if (remember) {
          localStorage.setItem("remember_email", email);
        } else {
          localStorage.removeItem("remember_email");
        }

        toast.success("Đăng nhập thành công 🎉");
        navigate("/dashboard");
      } else {
        toast.error(`Đăng nhập thất bại ❌ ${message || ""}`);
      }
    } catch (error: any) {
      toast.error(
        `Sai email hoặc mật khẩu ❌ ${error.response?.data?.message || ""}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý logout
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  // Kiểm tra trạng thái token để hiển thị nút logout nếu đã đăng nhập
  const token = localStorage.getItem("token");

  return (
    <div className="login-page">
      <div className="wrapper">
        {/* Cột trái: Form đăng nhập */}
        <div className="login-left">
          <div className="text-center">
            <img src="/codegymlogo.png" alt="Logo" className="login-logo" />
          </div>

          <h4 className="text-center mb-4 fgg">Đăng nhập</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control nput1"
                placeholder="Tên người dùng / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control nput2"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="remember">
                Nhớ tài khoản
              </label>
            </div>

            <div className="sd">
              <button type="submit" className="dangnhapbtn" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>

            <div className="text-center text-muted mb-2">hoặc</div>

            <div className="btcg">
              <button
                type="button"
                className="cg1d"
                onClick={() => login()} // ❌ chỉ gọi login SSO, không navigate dashboard nữa
              >
                Đăng nhập CodeGym ID
              </button>
            </div>

            {/* Hiển thị nút logout nếu đã đăng nhập */}
            {token && (
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="dangnhapbtn"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Cột phải: Ảnh nền */}
        <div className="login-right">
          <img
            src="https://blog.spacematrix.com/sites/default/files/styles/resp_large_breakpoints_theme_archi_dark_wide_1x/public/pantone_linkedin_cover.jpg"
            alt="Background"
            className="login-bg-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
