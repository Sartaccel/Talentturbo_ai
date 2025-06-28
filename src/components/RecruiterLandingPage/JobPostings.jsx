import React from 'react';
import './JobPostings.css';
import caseimg from '../../assets/Images/RecruiterPage/jobpostings_case.svg';
import locationimg from '../../assets/Images/RecruiterPage/jobpostings_location.svg';
import expimg from '../../assets/Images/RecruiterPage/jobpostings_exp.svg';
import salaryimg from '../../assets/Images/RecruiterPage/jobpostings_salary.svg';
import shiftimg from '../../assets/Images/RecruiterPage/jobpostings_shifttiming.svg';
import openingsimg from '../../assets/Images/RecruiterPage/jobpostings_openings.svg';
import talentturbo from '../../assets/Images/RecruiterPage/talentturbologo.png';

function JobPostings() {
  return (
    <section className="job-postings">
      <div className="container">
        <div className="jp-content">
          <div className="jp-card">
            <div className="jp-card-body">
              <div className="jp-card-details">
            <div className="jp-card-header">
              <div className="jp-logo">
                <img src={talentturbo} alt="talentturbo" />
              </div>
              <div className="jp-job-info">
                <h4 className="jp-job-title">UI / UX Designer</h4>
                <p className="jp-company">TalentTurbo</p>
              </div>
            </div>
            
            <div className="jp-divider"></div>
            
            <div className="jp-details">
              <h5 className="jp-section-title">Job Overview</h5>
              
              <div className="jp-detail-items">
                <div className="jp-detail-item">
                  <img src={caseimg} alt="case" />
                  <div className="jp-detail-content">
                    <span className="jp-detail-label1">Job type</span>
                    <span className="jp-detail-value">: Full time</span>
                  </div>
                </div>
                
                <div className="jp-detail-item">
                  <img src={locationimg} alt="location" />
                  <div className="jp-detail-content">
                    <span className="jp-detail-label2">Location</span>
                    <span className="jp-detail-value">: Nesamony Nagar, Nagercoil, Tamil Nadu</span>
                  </div>
                </div>
                
                <div className="jp-detail-item">
                  <img src={expimg} alt="exp" />
                  <div className="jp-detail-content">
                    <span className="jp-detail-label3">Experience</span>
                    <span className="jp-detail-value">: 2+ Years</span>
                  </div>
                </div>
                
                <div className="jp-detail-item">
                  <img src={salaryimg} alt="salary" />
                  <div className="jp-detail-content">
                    <span className="jp-detail-label4">Salary</span>
                    <span className="jp-detail-value">: ₹900K/yr - ₹1.2M/yr</span>
                  </div>
                </div>
                
                <div className="jp-detail-item">
                  <img src={shiftimg} alt="shift" />
                  <div className="jp-detail-content">
                    <span className="jp-detail-label5">Shift</span>
                    <span className="jp-detail-value">: Monday - Saturday, 9:00AM - 6:00PM</span>
                  </div>
                </div>
                
                <div className="jp-detail-item">
                  <img src={openingsimg} alt="openings" />
                  <div className="jp-detail-content">
                    <span className="jp-detail-label6">Openings</span>
                    <span className="jp-detail-value">: 2</span>
                  </div>
                </div>
              </div>
              
              <div className="jp-skills">
                <h5 className="jp-skills-title">Skills</h5>
                <div className="jp-skill-tags">
                  <span className="jp-skill-tag">User Research</span>
                  <span className="jp-skill-tag">User Persona</span>
                  <span className="jp-skill-tag">Storyboarding</span>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
          
          <div className="jp-info">
            <h2 className="jp-title">Job Postings <br />Create, Share, Invite, Refer, Manage</h2>            
            <p className="jp-description">
              Companies can quickly create detailed job postings on the platform,
              adding descriptions, skills, and essential details. These jobs can then
              be shared, candidates invited, and enable referrals, streamlining the
              process of widely promoting openings and attracting the right talent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobPostings;