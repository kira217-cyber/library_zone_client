import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaBook,
  FaEdit,
  FaClipboardList,
  FaSignOutAlt,
  FaHome,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const navLinks = [
  //   { to: "/dashboard", label: "Statistics", icon: <FaChartBar /> },
  { to: "/dashboard/addBook", label: "Add Book", icon: <FaBook /> },
  { to: "/dashboard/update-my-book", label: "Update My Book", icon: <FaEdit /> },
  {
    to: "/dashboard/borrowedBooks",
    label: "My Borrowed Book",
    icon: <FaClipboardList />,
  },
];

const bottomLinks = [{ to: "/", label: "Back to Home", icon: <FaHome /> }];

const DashboardLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  // Logout function
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successfully");
        navigate("/"); // Redirect to home after logout
      })
      .catch((err) => {
        toast.error("Logout failed");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Topbar for mobile/tablet */}
      <div className="lg:hidden flex items-center justify-between bg-[#2563EB] text-white px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">📚 Library Zone</span>
        </div>
        <button onClick={handleSidebarToggle} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar for laptop/desktop */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-[#2563EB] text-white py-6 px-2 h-screen fixed z-10">
        <div>
          <div className="flex items-center gap-3 mb-8 px-4">
            <span className="text-2xl font-bold">📚 Library Zone</span>
          </div>
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
      ${isActive ? "bg-blue-950 text-white" : "hover:bg-slate-700"}`
              }
            >
              <FaChartBar />
              <span>Statistics</span>
            </NavLink>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                    ${
                      isActive ? "bg-blue-950 text-white" : "hover:bg-slate-700"
                    }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 px-4 mb-2">
          <button
            onClick={handleLogout}
            className="flex hover:cursor-pointer items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors w-full text-left"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Sidebar for mobile/tablet */}
      <div
        className={`fixed inset-0 z-20 bg-opacity-40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={handleSidebarClose}
      ></div>
      <aside
        className={`fixed top-0 left-0 z-30 bg-[#2563EB] text-white w-64 h-full flex flex-col justify-between py-6 px-2
                transition-transform duration-300 lg:hidden ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
      >
        <div>
          <div className="flex items-center gap-3 mb-8 px-4">
            <span className="text-xl font-bold">📚 Library Zone</span>
            <button onClick={handleSidebarClose} className="ml-auto text-2xl">
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
      ${isActive ? "bg-blue-950 text-white" : "hover:bg-slate-700"}`
              }
            >
              <FaChartBar />
              <span>Statistics</span>
            </NavLink>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={handleSidebarClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                    ${
                      isActive ? "bg-blue-950 text-white" : "hover:bg-slate-700"
                    }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 px-4 mb-2">
          <button
            onClick={() => {
              handleLogout();
              handleSidebarClose();
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors w-full text-left"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleSidebarClose}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
