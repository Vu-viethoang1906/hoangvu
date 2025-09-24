import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/projects.css";
import "../styles/dashboard.css"; // Import CSS của dashboard để sử dụng sidebar

const Projects: React.FC = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu cho các issue
  const issues = [
    { id: "ECP-2", title: "Fix checkout page bug", status: "To Do", assignee: "https://via.placeholder.com/30", comments: 0 },
    { id: "ECP-1", title: "Implement user authentication", status: "In Progress", assignee: "https://via.placeholder.com/30", comments: 1 },
    { id: "ECP-3", title: "Design product catalog UI", status: "Review", assignee: "https://via.placeholder.com/30", comments: 1 },
    { id: "ECP-4", title: "Optimize database queries", status: "Done", assignee: "https://via.placeholder.com/30", comments: 2 },
  ];

  // Danh sách các mục trong sidebar
  const menuItems = [
    { name: "Dashboard", icon: "📊", active: false, path: "/dashboard" },
    { name: "Projects", icon: "📁", active: true, path: "/projects" },
    { name: "Filters", icon: "🔎", active: false },
    { name: "Reports", icon: "📊", active: false },
    { name: "Teams", icon: "👥", active: false },
    { name: "Settings", icon: "⚙️", active: false },
  ];

  // Danh sách dự án
  const projects = [
    "E-commerce Platform",
    "Mobile App",
    "Analytics Dashboard",
  ];

  const [isProjectsOpen, setIsProjectsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showProfile, setShowProfile] = React.useState(false);
  const email = localStorage.getItem("email") || "User";
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // Lọc các mục dựa trên từ khóa tìm kiếm
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="header-left">ECP - E-commerce Platform <span className="sub-title">Software project</span></div>
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
        <div className="kanban-board">
          <div className="column">
            <h3>To Do <span className="count">1</span></h3>
            {issues.filter(issue => issue.status === "To Do").map(issue => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <span className="issue-id">{issue.id}</span>
                  <span className="priority">🔴</span>
                </div>
                <p>{issue.title}</p>
                <div className="issue-footer">
                  <img src={issue.assignee} alt="Assignee" className="assignee-img" />
                  {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
                </div>
              </div>
            ))}
            <button className="create-issue-btn">+ Create issue</button>
          </div>
          <div className="column">
            <h3>In Progress <span className="count">1</span></h3>
            {issues.filter(issue => issue.status === "In Progress").map(issue => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <span className="issue-id">{issue.id}</span>
                  <span className="priority">✔️</span>
                </div>
                <p>{issue.title}</p>
                <div className="issue-footer">
                  <img src={issue.assignee} alt="Assignee" className="assignee-img" />
                  {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
                </div>
              </div>
            ))}
            <button className="create-issue-btn">+ Create issue</button>
          </div>
          <div className="column">
            <h3>Review <span className="count">1</span></h3>
            {issues.filter(issue => issue.status === "Review").map(issue => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <span className="issue-id">{issue.id}</span>
                  <span className="priority">⚠️</span>
                </div>
                <p>{issue.title}</p>
                <div className="issue-footer">
                  <img src={issue.assignee} alt="Assignee" className="assignee-img" />
                  {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
                </div>
              </div>
            ))}
            <button className="create-issue-btn">+ Create issue</button>
          </div>
          <div className="column">
            <h3>Done <span className="count">1</span></h3>
            {issues.filter(issue => issue.status === "Done").map(issue => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <span className="issue-id">{issue.id}</span>
                  <span className="priority">✅</span>
                </div>
                <p>{issue.title}</p>
                <div className="issue-footer">
                  <img src={issue.assignee} alt="Assignee" className="assignee-img" />
                  {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
                </div>
              </div>
            ))}
            <button className="create-issue-btn">+ Create issue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;