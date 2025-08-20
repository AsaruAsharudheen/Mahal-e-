import './footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <i
        onClick={() => {
          navigate('/');
        }}
        className="fa-solid fa-house"
      ></i>
      <i className="fa-solid fa-magnifying-glass"></i>
      <i
        onClick={() => {
          navigate('/fund');
        }}
        className="fa-solid fa-hand-holding-dollar admin-icon"
      ></i>

      <i
        onClick={() => {
          navigate('/profile');
        }}
        className="fa-solid fa-user"
      ></i>
    </div>
  );
};

export default Footer;
