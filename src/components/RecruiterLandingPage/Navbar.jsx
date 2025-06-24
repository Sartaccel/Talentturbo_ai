import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`${styles['navbar']} ${scrolled ? styles['scrolled'] : ''}`}>
      <div className={styles['navbar-container']}>
        <div className={styles['navbar-left']}>
          <a href="/" className={styles['navbar-logo']}>
            <span className={styles['logo-text']}>TALENT TURBO</span>
          </a>
        </div>
        
        <div className={styles['navbar-center']}>
          <div className={styles['candidate-link']}>
            Are you a candidate? 
            <a href="/jobs" className={styles['view-jobs-link']}>View jobs</a>
          </div>
        </div>
        
        <div className={styles['navbar-right']}>
          <a href="/login" className={styles['login-link']}>Recruiter Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;