import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import RecruiterLoginForm from './RecruiterLoginForm.jsx';
import RecruiterRegisterForm from './RecruiterRegisterForm.jsx';
import Header from '../LandingPage/Header.jsx';
import CandidateFeatureCarousel from './CandidateFeatureCarousel.jsx';
import RecruiterFeatureCarousel from './RecruiterFeatureCarousel.jsx';
import './AuthPage.css';
import './CandidateFeatureCarousel.css';
import './RecruiterFeatureCarousel.css';
import './LoginHeader.css';

const AuthPage = ({ userType = 'candidate' }) => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');
  const isRecruiter = userType === 'recruiter';

  const renderForm = () => {
    if (isLoginPage) {
      return isRecruiter ? <RecruiterLoginForm /> : <LoginForm />;
    } else {
      return isRecruiter ? <RecruiterRegisterForm /> : <RegisterForm />;
    }
  };

  return (
    <div className="auth-page">
      <Header isLoginPage={true} userType={userType} />
      <div className="main-content">
        <div className="login-container">
          <div className="login-feature-section">
            {isRecruiter ? <RecruiterFeatureCarousel /> : <CandidateFeatureCarousel />}
          </div>
          <div className="login-form-section">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;