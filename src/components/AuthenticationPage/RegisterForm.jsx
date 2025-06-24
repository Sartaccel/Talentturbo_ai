import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './RegisterForm.css';
import googleIcon from '../../assets/Images/LoginPage/Googleicon.svg';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
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
    console.log('Register attempt with:', credentials);
    // In a real app, you would call an API to handle authentication
  };

  return (
    <div className="register-form-container">
      <h2 className="register-title">Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name<span className="required">*</span></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={credentials.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email<span className="required">*</span></label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number<span className="required">*</span></label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={credentials.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password<span className="required">*</span></label>
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

        <div className="rf-resume-upload-container">
          <label htmlFor="resume-upload" className="rf-resume-label">
            Resume<span className="required">*</span>
          </label>
          <div className="file-upload-wrapper">
            <input 
              type="file" 
              id="resume-upload" 
              className="rf-file-input" 
              onChange={(e) => {
                const fileName = e.target.files[0]?.name || 'No file selected';
                const display = e.target.parentElement.querySelector('.file-display');
                if (display) display.textContent = fileName;
              }}
            />
            <span className="file-display">No file selected</span>
          </div>
        </div>

        <button type="submit" className="register-submit-btn">Register</button>
      </form>

      <div className="register-alternative">
        <div className="register-divider">
          <span>or Register using</span>
        </div>

        <div className="register-auth-options">
          <button className="register-google-auth">
            <img src={googleIcon} alt="Google" />
            Google
          </button>
        </div>
      </div>

      <div className="register-terms">
        <p>
          By logging in to your account you confirm your acceptance of our
          <a href="#terms"> Terms of Use </a> &
          <a href="#privacy"> Privacy Policy</a>.
        </p>
      </div>

      <div className="register-signup-link">
        <p>Existing user? <a href="login">Login</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;