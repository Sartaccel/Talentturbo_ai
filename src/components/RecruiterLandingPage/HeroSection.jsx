import React from 'react';
import styles from './HeroSection.module.css';
import Recruiter from '../../assets/Images/RecruiterPage/recruiter.svg';

function HeroSection() {
  return (
    <section className={styles['hero-section']}>
      <div className={styles['hero-container']}>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>
            Looking for <span className={styles['text-highlight']}>Top Talent?</span>
            <br />We've Got You Covered!
          </h1>
          <p className={styles['hero-description']}>
            We connect you to the best talent and job opportunities
            with speed, precision, and a streamlined process.
          </p>
          <div className={styles['hero-buttons']}>
            <a href="/register" className={`btn ${styles['hero-btn-register']}`}>Register now</a>
            <a href="/contact" className={`btn ${styles['hero-btn-contact']}`}>Contact Sales</a>
          </div>
        </div>
        <div className={styles['hero-image']}>
          <img 
            src={Recruiter} 
            alt="Helping talent reach their potential"
            className={styles['hero-img']}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;