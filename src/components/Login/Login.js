import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import api from '../../api/axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  
  // Estados para la UI
  const [isActive, setIsActive] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [error, setError] = useState('');

  // Estados para los formularios
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Manejadores de cambios en formularios
  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  // Manejadores de envío de formularios
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token y username en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', loginForm.username);
        navigate('/'); // Usar navigate en lugar de window.location
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Si el registro es exitoso, cambiar a la vista de login
      setIsActive(false);
      setError('Registro exitoso. Por favor, inicia sesión.');
    } catch (error) {
      setError();
    }
  };

  // Manejadores de vista
  const handleRegisterClick = () => {
    setIsActive(true);
    setError('');
  };

  const handleLoginClick = () => {
    setIsActive(false);
    setError('');
  };

  return (
    <div className="login-container">
      {error && <div className="error-message">{error}</div>}
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>fill the following fields</span>
            <input 
              type="text"
              name="username"
              value={registerForm.username}
              onChange={handleRegisterChange}
              placeholder="Username" 
              required
            />
            <input 
              type="email"
              name="email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              placeholder="Email" 
              required
            />
            <div className="password-container">
              <input 
                type={showRegisterPassword ? "text" : "password"}
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="Password" 
                required
              />
              <FontAwesomeIcon 
                icon={showRegisterPassword ? faEyeSlash : faEye}
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <span>use your username and password</span>
            <input 
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleLoginChange}
              placeholder="Username" 
              required
            />
            <div className="password-container">
              <input 
                type={showLoginPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Password" 
                required
              />
              <FontAwesomeIcon 
                icon={showLoginPassword ? faEyeSlash : faEye}
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;