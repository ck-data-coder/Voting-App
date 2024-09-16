import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import './login.css';
import { setusercontext, usercontext } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const setUserContext = useContext(setusercontext);
  const usercon = useContext(usercontext);
  const navigate = useNavigate();

  const loginInitialState = {
    userAdmin: '',
    email: '',
    password: ''
  };

  const [loginData, setLoginData] = useState(loginInitialState);

  const loginHandleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleUserAdminSelect = (role) => {
    setLoginData({ ...loginData, userAdmin: role });
  };

  const loginClick = (e) => {
    e.preventDefault();

    if (loginData.email === '' || loginData.password === '') {
      toast.error("Email and password are required", {
        position: 'top-center'
      });
      return;
    }

    if (loginData.userAdmin === '') {
      toast.error("Please select User or Admin");
      return;
    }

    const userType = loginData.userAdmin;
    const endpoint = userType === 'user' ? '/dashboard' : '/admin';

    axios.post("/api/login", { loginData, user: userType })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setUserContext(loginData);
        toast.success("Login successful!", {
          position: 'top-center'
        });
        navigate(endpoint);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed", {
          position: 'top-center'
        });
      });
  };

  return (
    <>
      <Link to={'/'}><img className='backBtn' src={require('./back.png')} alt="Back" /></Link>
      <div className=' login-header'>
        <img className='login-logo' src={require('./logo.jpg')} alt="Logo" />
        <h1>Login Panel</h1>
      </div>
      <section className="form-02-main">
        <div className="container">
          <div className="form-03-main">
            <div className="logo">
              <img className="userpng" src={require("./user.jpg")} alt="User" />
            </div>
            <div className="user-admin-toggle">
              <button
                className={`toggle-button ${loginData.userAdmin === 'user' ? 'active' : ''}`}
                onClick={() => handleUserAdminSelect('user')}
              >
                User
              </button>
              <button
                className={`toggle-button ${loginData.userAdmin === 'admin' ? 'active' : ''}`}
                onClick={() => handleUserAdminSelect('admin')}
              >
                Admin
              </button>
            </div>
            <form onSubmit={loginClick}>
              <div className="form-group">
                <input
                  type="email"
                  onChange={loginHandleChange}
                  value={loginData.email}
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  onChange={loginHandleChange}
                  value={loginData.password}
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="form-group forgot-password-container">
                <Link to="/forgetpassword" className="forgot-password-link">Forgot Password?</Link>
              </div>
              <div className="form-group">
                <button type="submit" className="submit-button">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
