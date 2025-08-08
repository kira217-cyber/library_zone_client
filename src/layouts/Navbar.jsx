import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/shared/Loading"
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logOut, user ,loading,setUser} = useAuth();
 
  
  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log("User logged out successfully", res);
        toast.success('Logout successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allBooks"
          className="hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          All Books
        </NavLink>
      </li>
      
    
      {
        user && <li>
        <NavLink
          to="/dashboard"
          className="hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          dashboard
        </NavLink>
      </li>
      }
      <li>
        <NavLink
          to="/about"
          className="hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </NavLink>
      </li>
      
    </>
  );
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <nav className="bg-[#2563EB] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-white">
            📚 LibraryHub
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">{navLinks}</ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-white hidden md:block">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="hover:text-white hidden md:block"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <div className="relative group hover:cursor-pointer">
                <img
                  src={user?.photoURL}
                  alt="user"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white"
                />
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-3 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap z-10">
                  {user?.displayName}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 text-sm hover:underline hover:cursor-pointer hidden md:inline"
              >
                Logout
              </button>
            </>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-[#2563EB] text-white px-4 pb-4 space-y-2">
          {navLinks}
          {!user ? (
            <>
              <li>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              {/* <button>Logout</button> */}
              <button
                className="hover:cursor-pointer hover:underline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
