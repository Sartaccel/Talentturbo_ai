import React from 'react';
import './CompanyProfile.css';
import caseimg from '../../assets/Images/RecruiterPage/case.svg';
import peopleimg from '../../assets/Images/RecruiterPage/companyprofile_people.svg';
import giftboximg from '../../assets/Images/RecruiterPage/companyprofile_giftbox.svg';
import talentturbo from '../../assets/Images/RecruiterPage/talentturbologo.png';
import locationlogo from '../../assets/Images/RecruiterPage/jobpostings_location.svg';

function CompanyProfile() {
  return (
    <section className="company-profile">
      <div className="container">
        <div className="cp-content">
          <div className="cp-info">
            <h2 className="cp-title">Company Profile <br/>Your Centralized Command Center</h2>
            <p className="cp-description">
              Every recruiter manager gets a dedicated Company Hub. This is your 
              go-to page to view all essential company details, monitor active job 
              openings, delve into crucial recruitment analytics, and manage your 
              company's social media presence for stronger employer branding.
            </p>
          </div>
          
          <div className="cp-card">
            <div className="cp-card-body">
              <div className="cp-card-details">
            <div className="cp-card-header">
              <div className="cp-logo">
                <img src={talentturbo} alt="talentturbo" />
              </div>
              <div className="cp-company-info">
                <h4 className="cp-company-name">TalentTurbo Technologies</h4>
                <p className="cp-company-industry">Human Resources Services</p>
              </div>
            </div>
            
            <div className="cp-divider"></div>
            
            <div className="cp-stats">
              <div className="cp-stat">
                <img src={caseimg} alt="case" />
                <span>300+ Jobs</span>
              </div>
              <div className="cp-stat">
                <img src={peopleimg} alt="people" />
                <span>100 - 500 Employees</span>
              </div>
              <div className="cp-stat">
                <img src={giftboximg} alt="giftbox" />
                <span>Health Insurance • Gym credit • Tuition and self-in</span>
              </div>
            </div>
            
            <div className="cp-tabs">
              <div className="cp-tab">About</div>
              <div className="cp-tab">Dashboard</div>
              <div className="cp-tab active">Jobs</div>
              <div className="cp-tab">Social</div>
            </div>
            
            <div className="cp-jobs">
              <div className="cp-job">
                <div className="cp-job-logo">
                  <img src={talentturbo} alt="talentturbo" />
                </div>
                <div className="cp-job-info">
                  <h5 className="cp-job-title">UI / UX Designer</h5>
                  <p className="cp-job-company">TalentTurbo</p>
                </div>
                <div className="cp-job-location">
                  <img src={locationlogo} alt="location" />
                  <span>Nagercoil, Tamil Nadu</span>
                </div>
              </div>
              
              <div className="cp-job">
                <div className="cp-job-logo">
                  <img src={talentturbo} alt="talentturbo" />
                </div>
                <div className="cp-job-info">
                  <h5 className="cp-job-title">Business analyst</h5>
                  <p className="cp-job-company">TalentTurbo</p>
                </div>
                <div className="cp-job-location">
                  <img src={locationlogo} alt="location" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyProfile;