import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './RecruiterRegisterForm.css';
import googleIcon from '../../assets/Images/LoginPage/Googleicon.svg';

const RecruiterRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      const display = e.target.parentElement.querySelector('.file-display');
      if (display) display.textContent = file.name;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!resumeFile) {
      alert('Please upload your resume');
      return;
    }

    try {
      // In a real app, you would make an API call here
      console.log('Submitting recruiter registration:', {
        ...credentials,
        resume: resumeFile.name
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login or dashboard after successful registration
      navigate('/recruiter/login');
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-title">Recruiter Register</h2>

      <div className="register-alternative">
        <div className="register-auth-options">
          <button className="register-google-auth">
            <img src={googleIcon} alt="Google" />
            Google
          </button>
        </div>
        <div className="register-divider">
          <span>or Register using</span>
        </div>
      </div>

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
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
            <span className="file-display">
              {resumeFile ? resumeFile.name : 'No file selected'}
            </span>
          </div>
        </div>

        <button type="submit" className="register-submit-btn">Register</button>
      </form>

      <div className="register-terms">
        <p>
          By logging in to your account you confirm your acceptance of our
          <a href="#terms"> Terms of Use </a> &
          <a href="#privacy"> Privacy Policy</a>.
        </p>
      </div>

      <div className="register-signup-link">
        <p>Already have an account? <a href="/recruiter/login">Login</a></p>
      </div>
    </div>
  );
};

export default RecruiterRegisterForm;