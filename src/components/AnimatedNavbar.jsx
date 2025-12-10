import { NavLink } from "react-router-dom";
import "@/AnimatedNavbar.css";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Students", path: "/students" },
  { label: "Custom Fields", path: "/fields", adminOnly: true },
];

export default function AnimatedNavbar({ user }) {
  return (
    <div className="animated-nav">
      <div className="nav-container">

        {menuItems
          .filter(item => !item.adminOnly || user?.role === "admin")
          .map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="nav-btn"
            >
              {item.label}
            </NavLink>
          ))}

        <svg className="outline" overflow="visible" width="500" height="60">
          <rect
            className="rect"
            pathLength="100"
            x="0"
            y="0"
            width="500"
            height="60"
            fill="transparent"
            strokeWidth="4"
          />
        </svg>

      </div>
    </div>
  );
}
