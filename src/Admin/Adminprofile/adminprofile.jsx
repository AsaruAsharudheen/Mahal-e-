import { useNavigate } from 'react-router-dom';
import './adminprofile.css';
import {
  FaUserCircle,
  FaInfoCircle,
  FaDonate,
  FaUserTie,
} from 'react-icons/fa';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import AdminFooter from '../AdminFooter/adminfooter';

const AdminProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminNavbar />
      <div className="profile-page">
        {/* Profile Icon Box */}
        <div className="profile-top-card">
          <FaUserCircle className="profile-avatar" />
          <h2>MAHAL'e'</h2>
          <p>Edit your details and manage account</p>
        </div>

        {/* Instagram-style Button Column */}
        <div className="profile-options">
          <button className="profile-btn">
            <FaInfoCircle className="btn-icon" /> About
          </button>
          <button
            onClick={() => {
              navigate('/');
            }}
            className="profile-btn"
          >
            <FaDonate className="btn-icon" /> Logout
          </button>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminProfile;
