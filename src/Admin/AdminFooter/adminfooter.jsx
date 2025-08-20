import './adminfooter.css';
import { useNavigate } from 'react-router-dom';

const AdminFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-footer">
      {/* Home */}
      <i
        onClick={() => {
          navigate('/admin/home');
        }}
        className="fa-solid fa-house admin-icon"
      ></i>

      {/* Fund */}
      <i
        onClick={() => {
          navigate('/admin/fundlist');
        }}
        className="fa-solid fa-hand-holding-dollar admin-icon"
      ></i>

      {/* Add */}
     

      {/* Reels */}
      <i
        onClick={() => {
          navigate('/reel');
        }}
        className="fa-solid fa-clapperboard admin-reels-icon admin-icon"
      ></i>

      {/* Profile */}
      <i
        onClick={() => {
          navigate('/admin/profile');
        }}
        className="fa-solid fa-user admin-icon"
      ></i>
    </div>
  );
};

export default AdminFooter;
