import React from 'react';
import './JobCard.css';
// import { Briefcase, MapPin, Calendar, Clock, Star } from 'lucide-react';
import Experience from '../../assets/Images/JobListings/Experience1.svg';
import Salary from '../../assets/Images/WhyChooseUs/Rupee.svg';
import Shift from '../../assets/Images/JobListings/ShiftTiming.svg';
import Location from '../../assets/Images/JobListings/location.svg';
// import WorkType from '../../assets/Images/JobListings/WorkType.svg';
import Due from '../../assets/Images/JobListings/DueDate.svg';
import Skill from '../../assets/Images/JobListings/Skills.svg';
import Briefcase from '../../assets/Images/JobListings/briefcase.svg';

const JobCard = ({ job }) => {
  // Early return if job is undefined or null
  if (!job) return null;

  // Extract job properties with fallbacks
  const {
    logo = '/company-logos/default.svg',
    title: jobTitle = '',
    company = '',
    rating = undefined,
    reviews = undefined,
    location = '',
    employmentType = '',
    experience = '',
    salary = '',
    minSalary = '',
    maxSalary = '',
    currency = '',
    shift = 'Mon - Sat, 9:00AM - 6:00PM',
    skills = [],
    postedDate = new Date().toISOString(),
    dueDate = new Date().toISOString()
  } = job || {};

  // Handle salary display
  let displaySalary = '';
  
  if (salary) {
    // If salary is already in the format "₹11,00,000 - ₹17,00,000", use it directly
    if (typeof salary === 'string' && salary.includes(' - ')) {
      displaySalary = salary;
    }
  } else if (minSalary || maxSalary) {
    // If we have separate min and max salary
    const min = minSalary ? `₹${minSalary}` : '';
    const max = maxSalary ? `₹${maxSalary}` : '';
    displaySalary = `${min}${min && max ? ' - ' : ''}${max}`;
  }

  const today = new Date();
  const posted = new Date(postedDate);
  const daysAgo = Math.floor((today - posted) / (1000 * 60 * 60 * 24));

  // Handle skills safely
  const displaySkills = Array.isArray(skills) ? skills.slice(0, 5) : [];
  const remainingSkills = Array.isArray(skills) ? (skills.length > 5 ? skills.length - 5 : 0) : 0;

  return (
    <div className="job-card">
      {/* Upper Section */}
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
            <span className="location">
              <img src={Location} alt="Location" width={14} height={14} /> {location}
            </span>
            <span className="due-date">
              <img src={Due} alt="Due Date" width="14" height="14" /> {dueDate}
            </span>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Lower Section */}
      <div className="job-card-bottom">
        {/* Row 1 */}
        <div className="job-meta-row">
          <div className="meta-item" style={{ fontSize: '14px' }}>
            <img src={Briefcase} alt="Work Type" width={14} height={14} />
            <span>{employmentType}</span>
          </div>
          <div className="meta-item" style={{ fontSize: '14px' }}>
            <img src={Experience} alt="Experience" width={14} height={14} />
            <span>{experience}</span>
          </div>
          <div className="meta-item" style={{ fontSize: '14px' }}>
            <img src={Salary} alt="Salary" width={14} height={14} />
            <span> ₹{minSalary} - ₹{maxSalary}/year </span>
          </div>
          <div className="meta-item" style={{ fontSize: '14px' }}>
            <img src={Shift} alt="Shift" width={14} height={14} />
            <span>{shift}</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="job-meta-row skills-row">
          <img src={Skill} alt="Skill" width={14} height={14} style={{ fontSize: '14px' }} />
          <div className="skills">
            {displaySkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
            {remainingSkills > 0 && (
              <span className="skill-tag">+{remainingSkills}</span>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="job-meta-row posted-row">
          <span style={{ fontSize: '14px' }}>{postedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
