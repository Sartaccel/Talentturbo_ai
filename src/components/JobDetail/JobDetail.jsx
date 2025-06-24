// JobDetail.jsx

import React, { useState } from "react";
import "./JobDetail.css";
import companyLogo from "../../../public/company-logos/default.svg";
import { Form, Button, Navbar } from 'react-bootstrap'
// import jobService from '../../services/jobService'
import search from '../../assets/Images/HeroSection/search.svg'
import findjobsearch from '../../assets/Images/HeroSection/Findjobsearch.svg'
import locationinjoblist from '../../assets/Images/JobListings/location.svg'
import experience from '../../assets/Images/HeroSection/experience.svg'
import { useNavigate } from 'react-router-dom'
import joboverviewbriefcase from '../../assets/Images/JobDescription/joboverviewbriefcase.svg'
import joboverviewlocation from '../../assets/Images/JobDescription/joboverviewlocation.svg'
import joboverviewexperience from '../../assets/Images/JobDescription/joboverviewexperience.svg'
import joboverviewsalary from '../../assets/Images/JobDescription/joboverviewsalary.svg'
import joboverviewshift from '../../assets/Images/JobDescription/joboverviewshift.svg'
import joboverviewopenings from '../../assets/Images/JobDescription/joboverviewopenings.svg'

const JobDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [category] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchQuery) queryParams.set('search', searchQuery);
    if (locationQuery) queryParams.set('location', locationQuery);
    if (experienceLevel) queryParams.set('experience', experienceLevel);

    navigate(`/jobs?${queryParams.toString()}`);
    setLoading(true);
    setError(null);
  };
  

  return (
    <>
    <div className="tabs-container" style={{ display: 'flex', alignItems: 'center', padding: '0 150px', border: '1px solid #D0D4DC', background: '#FFF', height: '60px' }}>
              <div className="tabs-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('jobs')}
                  style={{ padding: '20px 30px', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Jobs
                </button>
                <button
                  className={`tab ${activeTab === 'companies' ? 'active' : ''}`}
                  onClick={() => setActiveTab('companies')}
                  style={{ padding: '20px 30px', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Companies
                </button>
              </div>
              <div className="search-section" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Form className="search-bar" onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F5F5F5', borderRadius: '8px', border: '1px solid #D0D4DC', height: '46px' }}>
                  <div className="form-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px' }}>
                    <img src={search} alt="Search icon" className="form-icon" style={{ width: '14px', height: '14px' }} />
                    <Form.Control 
                      type="text" 
                      placeholder="Enter jobs, skills, company" 
                      aria-label="Job search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', backgroundColor: 'transparent', padding: '0' }}
                    />
                  </div>
                  <div className="form-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px' }}>
                    <img src={locationinjoblist} alt="Location icon" className="form-icon" style={{ width: '10px', height: '14px' }} />
                    <Form.Control
                      type="text" 
                      placeholder="Location" 
                      aria-label="Location"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      style={{ border: 'none', backgroundColor: 'transparent', padding: '0' }}
                    />
                  </div>
                  <div className="form-item-exp" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px' }}>
                    <img src={experience} alt="Experience icon" className="form-icon" style={{ width: '14px', height: '14px' }} />
                    <Form.Select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      style={{ border: 'none', backgroundColor: 'transparent', padding: '0' }}
                    >
                      <option value="">Experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="0-2 years">0-2 years</option>
                      <option value="2-5 years">2-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </Form.Select>
                  </div>
                  <Button type="submit" className="find-jobs-btn" style={{ backgroundColor: '#0073e6', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px' }}>
                    <img src={findjobsearch} alt="Find jobs icon" className="btn-icon" style={{ width: '20px', height: '20px' }} />Find jobs
                  </Button>
                </Form>
              </div>
            </div>
    <div className="job-detail-container">
      {/* <div className="main-content"> */}
        <div className="job-description-card">
          <div className="job-header">
            <img src={companyLogo} alt="Company Logo" />
            <div>
              <div className="job-title">User Interface &amp; User Experience Designer</div>
              <div className="job-subtitle">TalentTurbo • ★5.0 (75 reviews)</div>
            </div>
          </div>

      <hr className="divider" />

      <div className="job-section">
        <h3>Job Overview</h3>
        <div className="job-info">
          <div className="job-info-row">
            <div className="job-info-label">
              <img src={joboverviewbriefcase} alt="Job Type" />
              <span>Job Type</span>
            </div>
            <div className="job-info-value">: Full Time</div>
          </div>
          <div className="job-info-row">
            <div className="job-info-label">
              <img src={joboverviewlocation} alt="Location" />
              <span>Location</span>
            </div>
            <div className="job-info-value">: Nagercoil, Tamil Nadu</div>
          </div>
          <div className="job-info-row">
            <div className="job-info-label">
              <img src={joboverviewexperience} alt="Experience" />
              <span>Experience</span>
            </div>
            <div className="job-info-value">: 2+ Years</div>
          </div>
          <div className="job-info-row">
            <div className="job-info-label">
              <img src={joboverviewsalary} alt="Salary" />
              <span>Salary</span>
            </div>
            <div className="job-info-value">: ₹900K/Yr - ₹1.2M/Yr</div>
          </div>
          <div className="job-info-row">
            <div className="job-info-label">
              <img src={joboverviewshift} alt="Shift" />
              <span>Shift</span>
            </div>
            <div className="job-info-value">: Mon - Sat, 9AM - 6PM</div>
          </div>
          <div className="job-info-row">
            <div className="job-info-label">
              <img src={joboverviewopenings} alt="Openings" />
              <span>Openings</span>
            </div>
            <div className="job-info-value">: 2</div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="job-section">
        <h3>Skills</h3>
        <div className="skills-list">
          {["User Research", "User Persona", "Storyboarding", "User Journey Map", "Information Architecture", "Design Principles", "Wireframing", "Design Principles", "Visual design", "Interaction Design", "Prototyping", "Usability Testing", "Site mapping", "Color Theory", "Competitive Analysis"].map(skill => (
            <div className="skill-chip" key={skill}>{skill}</div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      <div className="job-section">
        <h3>Job Description</h3>
        <div className="job-description">
          We are looking for a creative and detail-driven UI/UX Designer to join our team and play a key role in shaping the user experience of our flagship products...
        </div>
      </div>

      <div className="job-section">
        <h3>Requirements</h3>
        <ul className="job-list">
          <li>Proven experience as a UI/UX Designer with a strong portfolio</li>
          <li>Proficiency in design tools like Figma, Sketch, Adobe XD</li>
          <li>Understanding of user-centered design principles</li>
          <li>Strong communication and collaboration skills</li>
          <li>Ability to create wireframes, storyboards, and prototypes</li>
        </ul>
      </div>

      <div className="job-section">
        <h3>Key Responsibilities</h3>
        <ul className="job-list">
          <li>Conduct user research and evaluate user feedback</li>
          <li>Translate concepts into wireframes and mockups</li>
          <li>Design and deliver user flows, wireframes, and prototypes</li>
          <li>Collaborate with product and development teams</li>
          <li>Stay up-to-date with UI trends and tools</li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="buttons">
        <button className="apply-btn">Apply now</button>
        <button className="refer-btn">Refer &amp; earn</button>
      </div>
      </div>

      <div className="otherdetails-card">
          <h3>Company Details</h3>
      <div className="company-section job-section">
          <div className="job-info">
          <div><b>TalentTurbo Technologies</b> • ★5.0 (75 reviews)</div>
          <div>Founded: March 2015</div>
            <div>📍 Milpitas, USA</div>
            <div>💼 300+ Jobs</div>
            <div>👥 100 - 500 Employees</div>
            <div>💰 ₹180K - ₹1.2M/year</div>
          </div>
        </div>

          <h3>Similar Jobs</h3>
      <div className="similar-jobs-section job-section">

        {[{
          title: "UI/UX Designer",
          company: "Carbitly",
          location: "Netherlands",
          salary: "₹1.5L/hr",
          shift: "Mon-Fri, 9AM - 6PM",
          due: "11 June 2025"
        }, {
          title: "UX Designer (Figma, Prototyping, Design Systems)",
          company: "SART Accelerator",
          location: "Sunnyvale, USA",
          salary: "₹14K/wk",
          shift: "Mon-Fri, 9AM - 6PM",
          due: "23 August 2025"
        }, {
          title: "User Researcher",
          company: "HomeiFix",
          location: "Tamil Nadu",
          salary: "₹14K/wk",
          shift: "Mon-Fri, 9AM - 6PM",
          due: "23 August 2025"
        }].map((job, index) => (
          <div key={index} className="similar-job-card">
            <h4>{job.title}</h4>
            <div className="similar-job-info">
              {job.company} • 📍 {job.location} • Due: {job.due}<br />
              💰 {job.salary} • 🕒 {job.shift}
            </div>
          </div>
        ))}
        </div>
      </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default JobDetail;
