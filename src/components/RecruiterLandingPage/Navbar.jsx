import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Button } from 'react-bootstrap';
import talentturbonavbarlogo from '../../assets/Images/TalentTurboNavbarLogo.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRecruiterLogin, setIsRecruiterLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogin = () => {
    setIsRecruiterLogin(true);
    navigate('/recruiter/login');
  };

  const handleRegister = () => {
    setIsRecruiterLogin(true);
    navigate('/recruiter/register');
  };

  return (
    <nav className={`${styles['navbar']} ${scrolled ? styles['scrolled'] : ''}`}>
      <div className={styles['navbar-container']}>
        <div className={styles['navbar-left']}>
          <a href="/" className={styles['navbar-logo']}>
            <img src={talentturbonavbarlogo} alt="Logo" className="navbar-logo" />
          </a>
        </div>
        
        <div className={styles['navbar-center']}>
          <div className={styles['candidate-link']}>
            Are you a candidate? 
            <a href="/jobs" className={styles['view-jobs-link']}>View jobs</a>
          </div>
        </div>
        
        {/* <div className={styles['navbar-right']}>
          <a href="/recruiter/login" className={styles['login-link']}>Recruiter Login</a>
        </div> */}
        <div className={styles['navbar-right']}>
              <Button 
                onClick={handleLogin} 
                variant="link"
                className={`${styles['login-btn']} ${styles['auth-button']}`}
              >
                Login
              </Button>
              <Button 
                onClick={handleRegister} 
                variant="primary"
                className={`${styles['signup-btn']} ${styles['auth-button']}`}
              >
                Recruiter Register
              </Button>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;