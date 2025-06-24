import React from 'react';
import './HowItWorks.css';
import building from '../../assets/Images/RecruiterPage/howitworks_building.svg';
import people from '../../assets/Images/RecruiterPage/howitworks_people.svg';
import diagramLine from '../../assets/Images/RecruiterPage/diagramLine.svg';

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="hiw-section-title">How it works?</h2>
        <div className="hiw-content">
          <div className="hiw-diagram">
            <div className="diagram-container">
              <div className="diagram-box manager">
                <img src={building} alt="Building" />
                <p>Recruiter manager</p>
              </div>
              
              <div className="diagram-lines">
                <img src={diagramLine} alt="Diagram Line" />
              </div>
              
              <div className="diagram-recruiters">
                <div className="diagram-box recruiter">
                  <img src={people} alt="People" />
                  <p>Recruiter</p>
                </div>
                <div className="diagram-box recruiter center">
                  <img src={people} alt="People" />
                  <p>Recruiter</p>
                </div>
                <div className="diagram-box recruiter">
                  <img src={people} alt="People" />
                  <p>Recruiter</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hiw-description">
            <h3 className="hiw-title">Recruiter team management <br />Empower Your Recruiting Force</h3>
            <p className="hiw-text">
              A dedicated Recruiter Manager account provides comprehensive 
              control over hiring operations. This feature enables a recruiter 
              manager to create and manage multiple Recruiter accounts for their 
              team and to oversee the company's profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;