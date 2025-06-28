import React from 'react';
import './AiPowered.css';
import personimg1 from '../../assets/Images/RecruiterPage/aipowered_person1.png'
import personimg2 from '../../assets/Images/RecruiterPage/aipowered_person2.png'
import personimg3 from '../../assets/Images/RecruiterPage/aipowered_person3.png'
import personimg4 from '../../assets/Images/RecruiterPage/aipowered_person4.png'
import personimg5 from '../../assets/Images/RecruiterPage/aipowered_person5.png'
import expimg from '../../assets/Images/RecruiterPage/jobpostings_exp.svg';

const candidates = [
  { 
    id: 1, 
    name: 'Ravichandar', 
    experience: '4+ years', 
    match: 90,
    avatar: personimg1
  },
  { 
    id: 2, 
    name: 'Priya Sharma', 
    experience: '3+ years', 
    match: 85,
    avatar: personimg2
  },
  { 
    id: 3, 
    name: 'Michael Lee', 
    experience: '2+ years', 
    match: 50,
    avatar: personimg3
  },
  { 
    id: 4, 
    name: 'Fatima Noor', 
    experience: 'Fresher', 
    match: 40,
    avatar: personimg4
  },
  { 
    id: 5, 
    name: 'Liam O\'Connor', 
    experience: '1+ years', 
    match: 35,
    avatar: personimg5
  }
];

function AiPowered() {
  const getMatchColor = (match) => {
    if (match >= 50) return 'high-match';
    return 'low-match';
  };

  return (
    <section className="ai-powered-section">
      <div className="ai-powered-content-wrapper">
        <div className="ai-powered-text-content">
          <h1 className="ai-powered-section-title">
          AI Powered Skill Match <br />Candidate - Job Pairing
          </h1>
          <p className="ai-powered-section-description">
            Revolutionize your hiring with AI Skill match. This intelligent feature 
            uses AI to instantly match candidates to job descriptions, providing a 
            clear skill matching rate to help you quickly identify the best fits and 
            streamline your shortlisting process.
          </p>
        </div>
        <div className="ai-powered-candidates-panel">
          <div className="ai-powered-candidates-list">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="ai-powered-candidate-card">
                <img 
                  src={candidate.avatar} 
                  alt={candidate.name}
                  className="ai-powered-candidate-avatar"
                />
                <div className="ai-powered-candidate-details">
                  <h3 className="ai-powered-candidate-name">{candidate.name}</h3>
                  <div className="ai-powered-candidate-experience">
                    <img src={expimg} alt="Experience" />
                    <span>{candidate.experience}</span>
                  </div>
                </div>
                <div className={`ai-powered-match-badge ai-powered-${getMatchColor(candidate.match)}`}>
                  {candidate.match}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiPowered;