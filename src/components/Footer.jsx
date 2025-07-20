import React from "react";
import { FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* EduManage Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EduManage</h2>
          <p className="text-sm text-gray-400">
            Empowering students and educators with smart learning solutions.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/allclass" className="hover:text-white">
                All Classes
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: support@edumanage.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:dev.dev.sohelranar@gmail.com"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
