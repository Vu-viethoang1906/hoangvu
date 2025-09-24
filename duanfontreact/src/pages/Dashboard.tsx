import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import {useAuth} from  "../auth/useKeycloak";

const Dashboard: React.FC = () => {
  const {  logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email") || "User";
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

 const handleLogout = () => {
const typeLogin = localStorage.getItem("Type_login");

  if (typeLogin === "SSO") {
    logout();
    localStorage.clear();
       navigate("/login");
     // Keycloak sẽ tự redirect về login page hoặc bạn có thể chỉ định redirectUri
  } else {
    // Xóa localStorage nếu là login thường
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("Type_login");
    
    navigate("/login");
  }
};


  // Danh sách các mục trong sidebar
  const menuItems = [
    { name: "Dashboard", icon: "📊", active: true },
    { name: "Projects", icon: "📁", active: false, path: "/projects" },
    { name: "Filters", icon: "🔎", active: false },
    { name: "Reports", icon: "📊", active: false },
    { name: "Teams", icon: "👥", active: false },
    { name: "Settings", icon: "⚙️", active: false },
  ];

  // Lọc các mục dựa trên từ khóa tìm kiếm
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Danh sách dự án
  const projects = [
    "E-commerce Platform",
    "Mobile App",
    "Analytics Dashboard",
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="app-title">KEN</h2>
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="nav-menu">
          {filteredItems.map((item) => (
            <li
              key={item.name}
              className={`nav-item ${item.active ? "active" : ""}`}
              onClick={() => item.path && navigate(item.path)}
            >
              <span className="logo">{item.icon}</span> {item.name}
            </li>
          ))}
        </ul>
        <div className="project-list">
          <h3
            className="project-title"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            Projects
            <span style={{ fontSize: "12px", transition: "transform 0.3s ease" }}>
              {isProjectsOpen ? "▼" : "▶"}
            </span>
          </h3>
          {isProjectsOpen && (
            <ul>
              {projects.map((project) => (
                <li key={project} className="project-item">
                  {project}
                </li>
              ))}
            </ul>
          )}
          <button className="create-project">
            <span className="logo">➕</span> Create project
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="header-left">ECP - Main e-commerce platform development</div>
          <div className="header-right">
            <span className="icon">?</span>
            <span className="icon">🔔</span>
            <div className="user-section" onClick={() => setShowProfile(!showProfile)}>
              <img src="https://via.placeholder.com/30?text=User+Avatar" alt="User" className="user-icon" />
              {showProfile && (
                <div className="profile-dropdown">
                  <p><strong>Email:</strong> {email}</p>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Issues</h3>
            <p className="card-value">4 <span className="sub-text">(+2 from last week)</span></p>
          </div>
          <div className="dashboard-card">
            <h3>Completed</h3>
            <p className="card-value">1 <span className="sub-text">(25% completion rate)</span></p>
            <span className="status-icon">✔️</span>
          </div>
          <div className="dashboard-card">
            <h3>In Progress</h3>
            <p className="card-value">1 <span className="sub-text">(Active development)</span></p>
            <span className="status-icon">⏳</span>
          </div>
          <div className="dashboard-card high-priority">
            <h3>High Priority</h3>
            <p className="card-value">2 <span className="sub-text">(Needs attention)</span></p>
            <span className="status-icon">⚠️</span>
          </div>
          <div className="dashboard-card progress-card">
            <h3>Project Progress</h3>
            <p>Overall completion status</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "25%" }}></div>
            </div>
            <p className="completion-rate">Completion Rate: 25%</p>
            <div className="progress-status">
              <span>To Do: 1</span>
              <span>In Progress: 1</span>
              <span>Review: 1</span>
              <span>Done: 1</span>
            </div>
          </div>
          <div className="dashboard-card">
            <h3>Issue Types</h3>
            <p>Distribution of work items</p>
            <div className="issue-type">
              <span className="issue-dot" style={{ backgroundColor: "red" }}></span> Bugs: 1
            </div>
          </div>
          <div className="dashboard-card">
            <h3>Team Members</h3>
            <p>Project contributors</p>
            <div className="team-member">
              <img src="https://via.placeholder.com/30" alt="Member" className="member-icon" />
              <span>John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;