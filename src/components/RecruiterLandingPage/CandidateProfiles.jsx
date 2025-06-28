import React, { useState } from 'react';
import phoneimg from '../../assets/Images/RecruiterPage/candidateprofiles_phone.svg';
import mailimg from '../../assets/Images/RecruiterPage/candidateprofiles_mail.svg';
import locationimg from '../../assets/Images/RecruiterPage/jobpostings_location.svg';
import carbifyimg from '../../assets/Images/RecruiterPage/carbifylogo.png';
import sartlogo from '../../assets/Images/RecruiterPage/sartlogo.png';
import explogo from '../../assets/Images/RecruiterPage/jobpostings_exp.svg';
import avatarimg from '../../assets/Images/RecruiterPage/candidateprofiles_person.png';
import './CandidateProfiles.css';

const candidateData = {
  name: 'Ravichandar',
  title: 'UI UX Designer',
  experience: '4+ years',
  phone: '+91 9879xxxxxx',
  email: 'ravixxxxxx@gmail.com',
  location: 'Nagercoil, Tamil Nadu',
  currentRole: {
    position: 'UI / UX Designer',
    company: 'Carbify',
    duration: 'Jun 2024 - Present'
  },
  previousRole: {
    position: 'UI / UX Designer',
    company: 'Sart',
    duration: 'Aug 2023 - Jun 2024'
  },
};

const CandidateProfiles = () => {
  const [activeTab, setActiveTab] = useState('Experience');

  const tabs = ['Resume', 'Education', 'Experience', 'Skills'];

  return (
    <section className="candidate-profiles-section">
      <div className="container">
        <div className="candidate-profiles-content-wrapper">
          <div className="candidate-detail-card">
            <div className='candidate-detail-card-inner'>
              <div className="candidate-header">
                <img 
                  src={avatarimg} 
                  alt={candidateData.name}
                  className="candidate-avatar-large"
                />
                <div className="candidate-main-info">
                  <div className="candidate-name-title">
                    <h2 className="candidate-name-large">{candidateData.name}</h2>
                    <p className="candidate-title">{candidateData.title}</p>
                  </div>
                  <button className="invite-btn">Invite</button>
                </div>
              </div>
              <div className="candidate-meta">
                <div className="meta-item">
                  <img src={explogo} alt="Experience" />
                  <span>{candidateData.experience}</span>
                </div>
                <div className="meta-item">
                  <img src={phoneimg} alt="Phone" />
                  <span>{candidateData.phone}</span>
                </div>
                <div className="meta-item">
                  <img src={mailimg} alt="Email" />
                  <span>{candidateData.email}</span>
                </div>
              </div>

              <div className="tabs-container">
                <div className="tabs">
                  <div className="tab">
                    <span className="tab-text">Resume</span>
                  </div>
                  <div className="tab">
                    <span className="tab-text">Education</span>
                  </div>
                  <div className="tab active">
                    <span className="tab-text">Experience</span>
                  </div>
                  <div className="tab">
                    <span className="tab-text">Skills</span>
                  </div>
                </div>
              </div>

              <div className="tab-content">
                {activeTab === 'Experience' && (
                  <div className="experience-content">
                    <div className="experience-item">
                      <div className="experience-icon">
                        <img src={carbifyimg} alt="company logo" />
                      </div>
                      <div className="experience-details">
                        <p className="duration">{candidateData.currentRole.duration}</p>
                        <h4>{candidateData.currentRole.position}</h4>
                        <div className="company-info">
                          <span className="company-name">{candidateData.currentRole.company}</span>
                          <div className="location-duration">
                            <img src={locationimg} alt="Location" />
                            <span>{candidateData.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="experience-item">
                      <div className="experience-icon">
                        <img src={sartlogo} alt="company logo" />
                      </div>
                      <div className="experience-details">
                        <p className="duration">{candidateData.previousRole.duration}</p>
                        <h4>{candidateData.previousRole.position}</h4>
                        <p className="company-name">{candidateData.previousRole.company}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="candidate-profiles-stats-section">
            <h2 className="stats-title">50,000+ Candidates Profiles <br/> Access a World of Talent</h2>
            <p className="stats-description">
              Recruiters can access an expansive candidate database of over 
              50,000+ professionals. This enables viewing of detailed candidate 
              profiles, understanding their backgrounds, and directly inviting 
              suitable candidates to jobs, broadening reach and streamlining hiring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateProfiles;