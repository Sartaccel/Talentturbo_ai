import React, { useState, useEffect } from "react";
import "./JobDescription.css";
import { Bookmark, Calendar, MapPin, Clock, Briefcase, Building2, Users } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import jobService from '../../services/jobService.js';
import search from '../../assets/Images/HeroSection/search.svg'
import findjobsearch from '../../assets/Images/HeroSection/Findjobsearch.svg'
import locationinjoblist from '../../assets/Images/JobListings/location.svg'
import experience from '../../assets/Images/HeroSection/experience.svg'
import Location from '../../assets/Images/JobListings/location.svg';
import Due from '../../assets/Images/JobListings/DueDate.svg';
import Skill from '../../assets/Images/JobListings/Skills.svg';

const JobDescription = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchQuery) queryParams.set('search', searchQuery);
    if (locationQuery) queryParams.set('location', locationQuery);
    if (experienceLevel) queryParams.set('experience', experienceLevel);
    if (category) queryParams.set('category', category);

    navigate(`/jobs?${queryParams.toString()}`);
  };

  // Extract job properties with fallbacks
  const {
    logo = null,
    jobTitle = '',
    company = '',
    rating = undefined,
    reviews = undefined,
    location = '',
    employmentType = '',
    experience = '',
    salary = '',
    shift = 'Mon - Sat, 9:00AM - 6:00PM',
    skills = [],
    postedDate = new Date().toISOString(),
    dueDate = new Date().toISOString()
  } = job || {};

  const today = new Date();
  const posted = new Date(postedDate);
  const daysAgo = Math.floor((today - posted) / (1000 * 60 * 60 * 24));

  // Handle skills safely
  const displaySkills = Array.isArray(skills) ? skills.slice(0, 5) : [];
  const remainingSkills = Array.isArray(skills) ? (skills.length > 5 ? skills.length - 5 : 0) : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <img src="../../assets/Images/error.svg" alt="Error" />
        </div>
        <div className="error-message">{error.message || 'Failed to load job details'}</div>
        <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="not-found-container">
        <div className="not-found-message">Job not found</div>
      </div>
    );
  }

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
    <div className="jobdescription-detail-container">
      {/* Header Navigation */}
      {/* <Header/> */}

      {/* jobdescription Overview */}
      
      <div className="jobdescription-card">
      <div>
        <button>Back</button>
      </div>
        {/* <div className="jobdescription-header">
          <h2>User Interface & User Experience Designer</h2>
          <span className="jobdescription-company-name">TalentTurbo <span className="jobdescription-rating">5.0 (75 reviews)</span></span>
          <Bookmark size={20} />
        </div> */}
        <div className="job-card-top">
                <div className="logo-section">
                  {logo && <img src={logo} alt="Company Logo" className="company-logo" width="50" height="50" />}
                </div>
                <div className="job-info">
                  <h3 className="job-title" style={{ fontSize: '20px' }}>{jobTitle}</h3>
                  <div className="company-details">
                    <span className="company-name">{company}</span>
                    <span className="rating-container">
                      <img src={Skill} alt="Rating" width={14} height={14} />
                      <span className="rating">{rating && reviews ? `${rating} (${reviews} reviews)` : 'No ratings'}</span>
                    </span>
                  </div>
                </div>
              </div>
        
              <hr className="divider" />

        <div className="jobdescription-overview">
          <div><Briefcase size={16} /> Full time</div>
          <div><MapPin size={16} /> Nesamony Nagar, Nagercoil, Tamil Nadu</div>
          <div>Experience: 2+ Years</div>
          <div>Salary: ₹900K/Y - ₹1.2M/Y</div>
          <div><Clock size={16} /> Mon - Sat, 9:00AM - 6:00PM</div>
          <div>Openings: 2</div>
        </div>

        {/* Skills */}
        <div className="jobdescription-skills">
          {["User Research", "User Persona", "Storyboarding", "User Journey Map", "Information Architecture", "Design Principles", "Wireframing", "Prototyping", "Color Theory"].map(skill => (
            <span className="jobdescription-skill-tag" key={skill}>{skill}</span>
          ))}
        </div>

        {/* Description */}
        <div className="jobdescription-description">
          <h3>Job description</h3>
          <p>
            We are looking for a creative and detail-driven UI/UX Designer to join our team and play a key role in shaping the user experience of our flagship products: HomeiFix, Tipsr, and TalentTurbo...
          </p>

          <h3>Key Responsibilities:</h3>
          <ul>
            <li>Design and enhance user interface and experience of our internal products</li>
            <li>Conduct user research, usability testing, and competitive analysis</li>
            <li>Create wireframes, prototypes, and high-fidelity UI designs</li>
            <li>Collaborate with stakeholders to define UX strategy</li>
          </ul>

          <h3>Requirements:</h3>
          <ul>
            <li>1+ years of experience in UI/UX design</li>
            <li>Proficiency in Figma, Adobe XD, Sketch</li>
            <li>Strong communication and multitasking skills</li>
            <li>Clean, functional design style</li>
          </ul>
          <div className="jobdescription-posted-date">Posted: 17 days ago</div>
        </div>

        <div className="jobdescription-cta">
          <button className="jobdescription-apply-btn">Apply now</button>
          <button className="jobdescription-refer-btn">Refer & earn</button>
        </div>
      </div>

      {/* Company Details */}
      <div className="jobdescription-company-details">
        <h3>Company Details</h3>
        <p><strong>TalentTurbo Technologies</strong> - 5.0 (75 reviews)</p>
        <p>Founded: March 2015 | Milpitas, USA +5</p>
        <p>300+ Jobs | 100 - 500 Employees | Salary: ₹180K - ₹1.2M/year</p>
        <p>Perks: Health Insurance, Gym Credit, Tuition Assistance, Paid Time Off</p>
      </div>

      {/* Similar jobdescriptions */}
      <div className="similar-jobdescriptions">
        <h3>Similar Jobs</h3>
        {/* Each similar jobdescription would be a jobdescriptionCard component in production */}
        <div className="similar-jobdescription-card">
          <h4>UI/UX Designer</h4>
          <p>Caribfy | ₹840/hr - ₹1.5K/hr | Part time</p>
        </div>
        <div className="similar-jobdescription-card">
          <h4>UX Designer (Figma, Prototyping)</h4>
          <p>SART Accelerator | ₹9K/wk - ₹14K/wk | Full time</p>
        </div>
        <div className="similar-jobdescription-card">
          <h4>User Researcher</h4>
          <p>HomeiFix | ₹9K/wk - ₹14K/wk | Full time</p>
        </div>
      </div>
      {/* Footer */}
      {/* <Footer/>  */}
    </div>
    </>
  );
};

export default JobDescription;
