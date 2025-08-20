import { useState } from 'react';
import { FaImage, FaVideo, FaDonate, FaHome } from 'react-icons/fa';
import './adminnavbar.css';

const AdminNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="admin-navbar">
        <h1>MAHAL'e'</h1>
        <div className="admin-symbol" onClick={() => setShowMenu(true)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      {/* Modal Menu */}
      {showMenu && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <span className="admin-close" onClick={() => setShowMenu(false)}>
              &times;
            </span>
            <div className="admin-menu-buttons">
              <a
                href="/admin/home"
                className="admin-btn btn-image"
                style={{ color: 'red' }}
              >
                <FaHome className="btn-icon" /> Home
              </a>
              <a
                style={{ color: 'red' }}
                href="/add"
                className="admin-btn btn-image"
              >
                <FaImage className="btn-icon" /> Add Image
              </a>
              <a
                style={{ color: 'red' }}
                href="/addvideo"
                className="admin-btn btn-video"
              >
                <FaVideo className="btn-icon" /> Add Video
              </a>
              <a
                style={{ color: 'red' }}
                href="/addfund"
                className="admin-btn btn-fund"
              >
                <FaDonate className="btn-icon" /> Add Fund
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
