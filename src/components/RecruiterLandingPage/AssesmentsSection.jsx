import React from 'react';
import './AssesmentsSection.css';
import dueDate from '../../assets/Images/RecruiterPage/dueicon.svg';
import skillmatch from '../../assets/Images/RecruiterPage/skillmatch.svg';

const jobRounds = [
  { id: 1, title: 'Aptitude', due: '27 August 2025', status: 'scheduled' },
  { id: 2, title: 'Technical', due: '10 September 2025', status: 'scheduled' },
  { id: 3, title: 'Code', due: '24 September 2025', status: 'scheduled' },
  { id: 4, title: 'Final Interview', due: 'TBD', status: 'pending' }
];

const AssessmentsSection = () => {
  return (
    <section className="assessments-section">
      <div className="assessments-container">
        <div className="assessments-content-wrapper">
          <div className="assessments-content">
            <div className="section-header">
              <h2 className="stats-title">Assessments & Job Rounds <br /> Streamline Candidate Evaluation</h2>
              <p className="stats-description">
                Manage your hiring pipeline with integrated assessments and job 
                rounds. Easily create skill evaluations, including MCQ, file upload, and 
                fill-in formats, etc. Set up and manage multiple job rounds, schedule 
                interviews, and gather feedback for efficient candidate evaluation.
              </p>
            </div>

            <div className="job-rounds-panel">
              <div className="rounds-list">
                {jobRounds.map((round) => (
                  <div key={round.id} className={`round-card ${round.status}`}>
                    <div className="round-header">
                      <h4 className="round-title">Round {round.id}</h4>
                      <span className="round-name">{round.title}</span>
                    </div>
                    {round.due !== 'TBD' && (
                      <div className="round-due">
                        <img src={dueDate} alt="Due Date" />
                        <span>Due: {round.due}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="interviewers-section">
            <div className="interviewers-list">
                <img src={skillmatch} alt="Skill Match" />
            </div>

            <div className="interviewers-stats">
              <h2 className="stats-title">2,000+ Verified Interviewers <br /> Seamless Interview Support</h2>
              <p className="stats-description">
                Access a network of pre-vetted interviewers directly through the 
                platform. This service allows companies to connect with experts who 
                can conduct thorough interviews for selected candidates, ensuring 
                professional evaluation and streamlining your final selection process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsSection;