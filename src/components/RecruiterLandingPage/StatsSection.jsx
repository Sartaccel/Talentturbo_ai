import React from 'react';
import './StatsSection.css';
import building from '../../assets/Images/RecruiterPage/building.svg';
import people from '../../assets/Images/RecruiterPage/people.svg';
import person from '../../assets/Images/RecruiterPage/person.svg';

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <img src={building} alt="Building" />
            </div>
            <h3 className="stat-title">500+ Companies</h3>
            <p className="stat-description">Trusted by over 500+ companies</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <img src={people} alt="People" />
            </div>
            <h3 className="stat-title">50,000+ Candidates</h3>
            <p className="stat-description">Trusted by over 50,000+ candidates</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <img src={person} alt="Person" />
            </div>
            <h3 className="stat-title">2,000+ Interviewers</h3>
            <p className="stat-description">We'll interview the selected candidates</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;