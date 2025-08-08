import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#2563EB] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📚 LibraryHub</h2>
          <p className="text-sm text-gray-100">
            Explore and manage your favorite books with ease. Borrow, read, and return — all in one place.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/allBooks" className="hover:underline">All Books</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">About Us</Link>
            </li>
            
          </ul>
        </div>

        {/* Social and Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaGithub />
            </a>
          </div>
          <p className="text-sm mt-4 text-gray-100">Email: support@libraryhub.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} LibraryHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
