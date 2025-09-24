import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/filters.css"; // CSS riêng cho Filters

const Filters: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email") || "User";
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);

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

  // Menu items cho sidebar
  const menuItems = [
    { name: "Dashboard", icon: "📊", active: false, path: "/dashboard" },
    { name: "Projects", icon: "📁", active: false, path: "/projects" },
    { name: "Filters", icon: "🔎", active: true },
    { name: "Reports", icon: "📊", active: false },
    { name: "Teams", icon: "👥", active: false },
    { name: "Settings", icon: "⚙️", active: false },
  ];

  // Danh sách dự án mẫu
  const projects = ["E-commerce Platform", "Mobile App", "Analytics Dashboard"];

  // Quick Filters mẫu
  const quickFilters = [
    { title: "All Issues", description: "View all issues across projects" },
    { title: "My Issues", description: "Issues assigned to me" },
    { title: "Recently Viewed", description: "Issues I've recently viewed" },
    { title: "Done Issues", description: "All completed issues" },
  ];

  // My Filters mẫu
  const myFilters = [
    {
      title: "My Open Issues",
      description: "All issues assigned to me that are not done",
      query: 'assignee = currentuser() AND status != "Done"',
      author: "John Doe",
      lastUsed: "22/01/2024",
    },
    {
      title: "High Priority Bugs",
      description: "All bug issues with high or highest priority",
      query: 'type = "Bug" AND priority in ("High", "Highest")',
      author: "John Doe",
      lastUsed: "21/01/2024",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="app-title">Jira Clone</h2>
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="nav-menu">
          {menuItems.map((item) => (
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
          <h3 className="project-title" onClick={() => setShowProfile(!showProfile)}>
            Projects <span>{showProfile ? "▲" : "▼"}</span>
          </h3>
          {showProfile && (
            <ul>
              {projects.map((project) => (
                <li key={project} className="project-item">
                  {project}
                </li>
              ))}
            </ul>
          )}
          <button className="create-project">+ Create project</button>
        </div>
        <div className="sidebar-footer">
          <p className="sidebar-email">{email}</p>
          <button onClick={handleLogout} className="sidebar-logout">Logout</button>
        </div>
      </div>

      <div className="main-content">
        {/* Header */}
        <div className="filters-header">
          <div>
            <h1 className="filters-title">Filters</h1>
            <p className="filters-subtitle">Save and manage your custom issue searches</p>
          </div>
          <button className="create-filter-btn">+ Create Filter</button>
        </div>

        {/* Search */}
        <div className="filters-search">
          <input
            type="text"
            placeholder="Search filters..."
            className="filters-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Quick Filters */}
        <div className="panel">
          <h2 className="panel-title">Quick Filters</h2>
          <div className="quick-grid">
            {quickFilters.map((filter, index) => (
              <div key={index} className="quick-card">
                <div className="quick-card-title">{filter.title}</div>
                <div className="quick-card-desc">{filter.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider" />

        {/* My Filters */}
        <div className="panel">
          <h2 className="panel-title">My Filters</h2>
          <div className="my-grid">
            {myFilters.map((filter, index) => (
              <div key={index} className="my-card">
                <div className="my-card-header">
                  <div className="my-card-title">{filter.title}</div>
                  <div className="my-card-actions">
                    <button title="Favorite" className="icon-btn">★</button>
                    <button title="Edit" className="icon-btn">✎</button>
                    <button title="Delete" className="icon-btn">🗑</button>
                  </div>
                </div>
                <div className="my-card-desc">{filter.description}</div>
                <pre className="my-card-query">{filter.query}</pre>
                <div className="my-card-footer">
                  <span className="author">by {filter.author}</span>
                  <span className="last-used">Last used {filter.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;