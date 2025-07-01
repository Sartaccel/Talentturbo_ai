// src/components/AuthenticationPage/Verification.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/Images/Verification/BackIcon.svg';
import './CandidateVerification.css';
import warningIcon from '../../assets/Images/Verification/warning.svg';
import arrowIcon from '../../assets/Images/Verification/arrow.svg';
import successIcon from '../../assets/Images/Verification/success.svg';

const CandidateVerification = ({ email, mobileNumber, userType = 'candidate' }) => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState({ show: false, type: 'email' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  const currentVerificationType = showOtpScreen.type === 'email' ? 'Email' : 'Mobile Number';

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    
    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (showOtpScreen.type === 'email') {
        setEmailVerified(true);
      } else {
        setMobileVerified(true);
      }
      setShowOtpScreen({ show: false, type: 'email' });
    }, 1500);
  };
  
  // Handle resend OTP
  const handleResendOtp = () => {
    if (resendDisabled) return;
    
    // Reset OTP and start countdown
    setOtp(['', '', '', '', '', '']);
    setResendDisabled(true);
    setCountdown(30);
    
    // Simulate API call to resend OTP
    console.log(`Resending OTP to ${showOtpScreen.type}:`, 
      showOtpScreen.type === 'email' ? email : mobileNumber);
  };
  
  // Countdown effect for resend OTP
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleEmailVerify = (e) => {
    e.preventDefault();
    setShowOtpScreen({ show: true, type: 'email' });
    setOtp(['', '', '', '', '', '']);
    // In a real app, you would trigger OTP sending here
    console.log('Sending OTP to email:', email);
  };

  const handleMobileVerify = (e) => {
    e.preventDefault();
    setShowOtpScreen({ show: true, type: 'mobile' });
    setOtp(['', '', '', '', '', '']);
    // In a real app, you would trigger OTP sending here
    console.log('Sending OTP to mobile:', mobileNumber);
  };

  const handleContinue = () => {
    // Navigate to the appropriate dashboard based on user type
    if (userType === 'recruiter') {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/candidate/dashboard');
    }
  };
  
  const handleBackToVerification = () => {
    setShowOtpScreen({ show: false, type: 'email' });
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  const isContinueEnabled = emailVerified && mobileVerified;

  // OTP Verification Screen
  if (showOtpScreen.show) {
    return (
      <div className="verification-otp-container">
        <div className="verification-otp-header">
          <button 
            type="button"
            className="verification-otp-back" 
            onClick={() => setShowOtpScreen(false)}
            aria-label="Go back to verification"
          >
            <img src={BackIcon} alt="Back" />
          </button>
          <h2>Verify {currentVerificationType}</h2>
        </div>
        
        <div className="verification-otp-content">
          <p className="verification-otp-instruction">
            Enter the OTP we've sent to <span className="verification-otp-email">
              {showOtpScreen.type === 'email' ? email : mobileNumber}
            </span>.
            {showOtpScreen.type === 'email' ? " Check your spam folder if you don't see it." : ""}
          </p>
          
          <form onSubmit={handleSubmit} className="verification-otp-form" noValidate>
            <div className="verification-otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`verification-otp-input ${error ? 'error' : ''}`}
                  autoFocus={index === 0}
                  aria-label={`Digit ${index + 1} of 6`}
                />
              ))}
            </div>
            
            {error && <div className="verification-otp-error">{error}</div>}
            
            <div className="verification-otp-actions">
              <p className="verification-otp-resend-text">
                Didn't receive code?{' '}
                <button 
                  type="button"
                  onClick={handleResendOtp} 
                  className={`verification-otp-resend ${resendDisabled ? 'disabled' : ''}`}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? (
                    <span>Resend OTP in {countdown}s</span>
                  ) : (
                    <span>Resend OTP</span>
                  )}
                </button>
              </p>
            </div>
            
            <button 
              type="submit" 
              className="verification-otp-submit"
              disabled={otp.some(digit => !digit) || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Next'}
              {!isLoading && <img src={arrowIcon} alt="Arrow" className="verification-otp-submit-icon" />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main Verification Screen
  return (
    <div className="verification-container">
      <h2 className="verification-title">Verification</h2>
      <p className="verification-description">
        To complete your registration, please verify your email or mobile number.
      </p>

      <div className="verification-cards">
        <div className="verification-card">
          <div className="verification-content">
            <div className="verification-label">
              {!emailVerified ? <img src={warningIcon} alt="Warning" /> : <img src={successIcon} alt="Success" />}
              <span>Email</span>
            </div>
            <div className="verification-email">{email}</div>
          </div>
          {!emailVerified ? (
            <a href="#" className="verify-link" onClick={handleEmailVerify}>
              Verify <img src={arrowIcon} alt="Arrow" />
            </a>
          ) : (
            <span style={{ color: '#666565', fontWeight: 500 }}>Verified</span>
          )}
        </div>

        <div className="verification-card">
          <div className="verification-content">
            <div className="verification-label">
              {!mobileVerified ? <img src={warningIcon} alt="Warning" /> : <img src={successIcon} alt="Success" />}
              <span>Mobile Number</span>
            </div>
            <div className="verification-email">{mobileNumber}</div>
          </div>
          <div className="verification-details">
            {!mobileVerified ? (
              <a href="#" className="verify-link" onClick={handleMobileVerify}>
                Verify <img src={arrowIcon} alt="Arrow" />
              </a>
            ) : (
              <span style={{ color: '#666565', fontWeight: 500 }}>Verified</span>
            )}
          </div>
        </div>
      </div>

      <button 
        className={`continue-button ${(emailVerified && mobileVerified) ? 'enabled' : ''}`}
        disabled={!(emailVerified && mobileVerified)}
        onClick={() => navigate(userType === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard')}
      >
        Continue
      </button>
    </div>
  );
};

export default CandidateVerification;