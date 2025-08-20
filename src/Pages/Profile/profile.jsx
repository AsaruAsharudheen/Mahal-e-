import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/navbar';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import {
  FaUserCircle,
  FaInfoCircle,
  FaDonate,
  FaUserTie,
} from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
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
              navigate('/fund');
            }}
            className="profile-btn"
          >
            <FaDonate className="btn-icon" /> Fund Details
          </button>
          <button
            onClick={() => {
              navigate('/committee');
            }}
            className="profile-btn"
          >
            <FaUserTie className="btn-icon" /> Committee
          </button>{' '}
          <button
            onClick={() => {
              navigate('/admin/login');
            }}
            className="profile-btn"
          >
            <FaUserTie className="btn-icon" /> Admin
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
