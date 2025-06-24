import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './LoginForm.css';
import ForgotPassword from './ForgotPassword';
import googleIcon from '../../assets/Images/LoginPage/Googleicon.svg';
import otpIcon from '../../assets/Images/LoginPage/OTPkeyicon.svg';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    emailOrMobile: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', credentials);
    // In a real app, you would call an API to handle authentication
  };

  if (showForgotPassword) {
    return <ForgotPassword onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailOrMobile">Email or Mobile number</label>
          <input 
            type="text" 
            id="emailOrMobile" 
            name="emailOrMobile"
            value={credentials.emailOrMobile}
            onChange={handleChange}
            placeholder="Enter your email or mobile number"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button 
              type="button" 
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="form-options">
          <div className="remember-me">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button 
            type="button" 
            className="forgot-password" 
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot password?
          </button>
        </div>
        
        <button type="submit" className="loginform-login-btn">Login</button>
      </form>
      
      <div className="alternative-login">
        <div className="divider">
          <span>or login using</span>
        </div>
        
        <div className="auth-options">
          <button className="google-auth">
            <img src={googleIcon} alt="Google" />  
            Google
          </button>
          <button type="button" className="otp-auth" onClick={() => setShowForgotPassword(true)}>
            <img src={otpIcon} alt="OTP" />
            OTP
          </button>
        </div>
      </div>
      
      <div className="terms">
        <p>
          By logging in to your account you confirm your acceptance of our 
          <a href="#terms"> Terms of Use </a> & 
          <a href="#privacy"> Privacy Policy</a>.
        </p>
      </div>

      <div className="signup-link">
        <p>New user? <a href="register">Register</a></p>
      </div>
    </div>
  );
};

export default LoginForm;