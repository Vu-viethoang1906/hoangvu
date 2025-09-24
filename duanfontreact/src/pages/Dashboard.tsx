import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
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
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // Danh sách các mục trong sidebar
  const menuItems = [
    { name: "Dashboard", icon: "📊", active: true, path: "/dashboard" },
    { name: "Projects", icon: "📁", active: false, path: "/projects" },
    { name: "Filters", icon: "🔎", active: false, path: "/filters" },
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
        {/* Top bar */}
        <div className="topbar">
          <div className="topbar-right">
            <span className="icon">?</span>
            <span className="icon">🔔</span>
            <div className="user-section" onClick={() => setShowProfile(!showProfile)}>
              <img src="https://via.placeholder.com/30?text=U" alt="User" className="user-icon" />
              {showProfile && (
                <div className="profile-dropdown">
                  <p><strong>Email:</strong> {email}</p>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero header */}
        <div className="hero">
          <div className="badge">ECP</div>
          <div>
            <h1 className="hero-title">E-commerce Platform</h1>
            <p className="hero-subtitle">Main e-commerce platform development</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-title">Total Issues</div>
            <div className="stat-value">4</div>
            <div className="stat-note">+2 from last week</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Completed</div>
            <div className="stat-value">1</div>
            <div className="stat-note">25% completion rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">In Progress</div>
            <div className="stat-value">1</div>
            <div className="stat-note">Active development</div>
          </div>
          <div className="stat-card danger">
            <div className="stat-title">High Priority</div>
            <div className="stat-value">2</div>
            <div className="stat-note">Needs attention</div>
          </div>
        </div>

        {/* Progress panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Project Progress</div>
            <div className="panel-subtitle">Overall completion status</div>
          </div>
          <div className="progressbar">
            <div className="progressbar-fill" style={{ width: "25%" }} />
            <div className="progressbar-label">25%</div>
          </div>
          <div className="progress-meta">
            <span>To Do: 1</span>
            <span>In Progress: 1</span>
            <span>Review: 1</span>
            <span>Done: 1</span>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="bottom-grid">
          <div className="panel">
            <div className="panel-title">Issue Types</div>
            <div className="issue-types">
              <span className="dot" style={{ background: "#de350b" }} /> Bugs: 1
            </div>
          </div>
          <div className="panel">
            <div className="panel-title">Team Members</div>
            <div className="team-members">
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