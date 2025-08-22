import { FaImage, FaVideo, FaDonate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './adminhome.css';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import AdminFooter from '../AdminFooter/adminfooter';

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />
      <div className="admin-home-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-menu">
          <div className="menu-card" onClick={() => navigate('/add')}>
            <FaImage className="menu-icon" />
            <p>Add Image</p>
          </div>
          <div className="menu-card" onClick={() => navigate('/addvideo')}>
            <FaVideo className="menu-icon" />
            <p>Add Video</p>
          </div>
          <div className="menu-card" onClick={() => navigate('/addfund')}>
            <FaDonate className="menu-icon" />
            <p>Fund Add</p>
          </div>{' '}
          <div className="menu-card" onClick={() => navigate('/addnercha')}>
            <FaDonate className="menu-icon" />
            <p>NerchaAdd</p>
          </div>
          <div className="menu-card" onClick={() => navigate('/listnercha')}>
            <FaDonate className="menu-icon" />
            <p>NerchaList</p>
          </div>{' '}
          <div className="menu-card" onClick={() => navigate('/admin/fundlist')}>
            <FaDonate className="menu-icon" />
            <p>FundList</p>
          </div>{' '}
          <div
            className="menu-card"
            onClick={() => navigate('/admin/committee')}
          >
            <FaDonate className="menu-icon" />
            <p>Commitiee</p>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminHome;
