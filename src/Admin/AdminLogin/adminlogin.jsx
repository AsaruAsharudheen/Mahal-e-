import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/navbar';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();

    if (email === 'mahale@2025' && password === 'mahale@313') {
      // ✅ Correct login → go to admin home page
      navigate('/admin/home');
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <>
    <Navbar/>
      <div className="admin-login-container">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdminLogin;
