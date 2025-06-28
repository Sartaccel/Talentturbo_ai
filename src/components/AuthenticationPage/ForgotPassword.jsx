import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Mail } from 'lucide-react';
import './ForgotPassword.css';

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // Initialize the OTP input refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle countdown timer
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email or mobile number');
      return;
    }
    
    // Simple validation for email or mobile (10 digits)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMobile = /^\d{10}$/.test(email);
    
    if (!isEmail && !isMobile) {
      setError('Please enter a valid email or 10-digit mobile number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpScreen(true);
      setError('');
    }, 1000);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers and empty string
    if (value !== '' && isNaN(value)) return;
    
    // Update OTP
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');

    // Move to next input if current input has a value
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1].focus();
      } else if (otp[index] !== '') {
        // Clear current input and stay
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    // Validate OTP
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    
    // Handle OTP verification
    console.log('Verifying OTP:', otpCode);
    // Add your API call here
  };

  const handleResendOtp = () => {
    if (resendDisabled) return;
    
    // Start countdown
    setResendDisabled(true);
    setCountdown(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    // Focus on first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    
    // Simulate API call to resend OTP
    console.log('Resending OTP...');
    // Replace with actual API call
    // await api.resendOtp({ email });
  };

  // Render Email Input Screen
  if (!showOtpScreen) {
    return (
      <div className="forgot-pw-container">
        <div className="forgot-pw-header">
          <button 
            type="button"
            className="forgot-pw-back-button" 
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h2>Forgot password</h2>
        </div>
        
        <div className="forgot-pw-content">
          <p className="forgot-pw-instruction">
            Enter your email or mobile number and we'll send you a OTP via email or SMS to reset your password.
          </p>
          <form onSubmit={handleEmailSubmit} className="forgot-pw-form" noValidate>
            <div className="forgot-pw-input-group">
              <label htmlFor="email" className="forgot-pw-label">Email or Mobile number</label>
              <div className="forgot-pw-input-container">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="forgot-pw-email-input"
                  placeholder="Enter your email or mobile number"
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {error && <div className="forgot-pw-error">{error}</div>}
            </div>
            
            <div className="forgot-pw-button-group">
              <button 
                type="submit" 
                className="forgot-pw-verify-button"
                disabled={isLoading || !email.trim()}
              >
                {isLoading ? 'Sending...' : 'Next'}
              </button>
              
              <div className="forgot-pw-back-to-login-container">
                <span className="forgot-pw-back-to-login-text">Know your password?</span>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onBack();
                  }} 
                  className="forgot-pw-back-to-login"
                >
                  Go back to Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render OTP Verification Screen
  return (
    <div className="forgot-pw-container">
      <div className="forgot-pw-header">
        <button 
          type="button"
          className="forgot-pw-back-button" 
          onClick={() => {
            setShowOtpScreen(false);
            setError('');
          }}
          aria-label="Go back to email input"
        >
          <ArrowLeft size={20} />
        </button>
        <h2>Forgot password</h2>
      </div>
      
      <div className="forgot-pw-content">
        <p className="forgot-pw-instruction">
          Enter the OTP we've sent to <span className="forgot-pw-email">{email}</span>.
          Check your spam folder if you don't see it.
        </p>
        
        <form onSubmit={handleSubmit} className="forgot-pw-form" noValidate>
          <div className="forgot-pw-otp-container">
            <div className="forgot-pw-otp-inputs" role="group" aria-label="Enter 6-digit verification code">
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
                  className={`forgot-pw-otp-input ${error ? 'error' : ''}`}
                  autoFocus={index === 0}
                  aria-label={`Digit ${index + 1} of 6`}
                />
              ))}
            </div>
            
            {error && <div className="forgot-pw-error">{error}</div>}
            
            <div className="forgot-pw-actions">
              <p className="forgot-pw-resend-text">
                Didn't receive code?{' '}
                <button 
                  type="button"
                  onClick={handleResendOtp} 
                  className={`forgot-pw-resend-button ${resendDisabled ? 'disabled' : ''}`}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? (
                    <span className="forgot-pw-resend-timer">Resend OTP in {countdown}s</span>
                  ) : (
                    <span className="forgot-pw-resend-timer">Resend OTP</span>
                  )}
                </button>
              </p>
            </div>
          </div>
          
          <div className="forgot-pw-button-group">
            <button 
              type="submit" 
              className="forgot-pw-verify-button"
              disabled={otp.some(digit => !digit) || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
              {!isLoading && <ChevronRight size={18} className="button-icon" />}
            </button>
            
            <div className="forgot-pw-back-to-login-container">
              <span className="forgot-pw-back-to-login-text">Know your password?</span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }} 
                className="forgot-pw-back-to-login"
              >
                Go back to Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
