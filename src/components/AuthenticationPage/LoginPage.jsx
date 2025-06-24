import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import Header from '../LandingPage/Header.jsx';
import LoginFeatureCarousel from './LoginFeatureCarousel.jsx';
import './LoginPage.css';
import './LoginFeatureCarousel.css';
import './LoginHeader.css';

const LoginPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="login-page">
      <Header isLoginPage={true} />
      <div className="main-content">
        <div className="login-container">
          <div className="login-feature-section">
            <LoginFeatureCarousel />
          </div>
          <div className="login-form-section">
            {isLoginPage ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;