import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import jobService from '../../services/jobService';
import './JobListings.css';
import search from '../../assets/Images/HeroSection/search.svg';
import findjobsearch from '../../assets/Images/HeroSection/Findjobsearch.svg';
import locationinjoblist from '../../assets/Images/JobListings/location.svg';
import experience from '../../assets/Images/HeroSection/experience.svg';
import JobCard from './JobCard';

const JobListings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromSearch = location.state?.fromSearch || false;

  // Add white header class to body when on jobs page
  useEffect(() => {
    document.body.classList.add('white-header-page');
    return () => {
      document.body.classList.remove('white-header-page');
    };
  }, []);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [category] = useState('');

  // Format date to "X days ago"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  // Map API job data to match JobCard props
  const mapJobData = (apiJob) => ({
    id: apiJob.id,
    title: apiJob.jobTitle || 'No Title',
    company: apiJob.companyName || 'Company Not Specified',
    location: apiJob.location || 'Location Not Specified',
    employmentType: apiJob.employeeType || 'Full-time',
    experience: apiJob.experience ? `${apiJob.experience} years` : 'Experience not specified',
    salary: apiJob.salary,
    minSalary: apiJob.minSalary,
    maxSalary: apiJob.maxSalary,
    currency: apiJob.currency || '₹',
    postedDate: apiJob.createdDate ? formatDate(apiJob.createdDate) : 'Recently',
    dueDate: apiJob.dueDate || 'Not specified',
    skills: apiJob.technology ? [apiJob.technology] : [],
    jobDescription: apiJob.jobDescription || 'No description available',
    jobRequirement: apiJob.jobRequirement || 'No requirements specified',
    documentsRequired: apiJob.documentsRequired || 'No documents specified'
  });

  // Fetch jobs when component mounts or when search parameters change
  useEffect(() => {
    const fetchJobs = async () => {
      console.log('Starting to fetch jobs...');
      try {
        setLoading(true);
        setError(null);
        
        // Get search parameters from URL and state
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search') || searchQuery || '';
        const locationQueryParam = searchParams.get('location') || locationQuery || '';
        const experience = searchParams.get('experience') || experienceLevel || '';
        const currentCategory = location.state?.category || category || '';

        console.log('Fetching jobs with params:', {
          search,
          location: locationQueryParam,
          experience,
          category: currentCategory
        });

        // Clear previous data
        setJobs([]);

        // Call the public API through jobService
        const result = await jobService.getPublicJobListings({
          search,
          location: locationQueryParam,
          experience,
          page: 0,  // You can implement pagination later
          size: 10
        });

        console.log('API Response:', result);

        if (result.success) {
          // Map the API response to match JobCard props
          const mappedJobs = Array.isArray(result.jobs) ? result.jobs.map(mapJobData) : [];
          console.log(`Found ${mappedJobs.length} jobs`, mappedJobs);
          setJobs(mappedJobs);
          
          if (mappedJobs.length === 0) {
            setError('No jobs found matching your criteria.');
          }
        } else {
          console.error('API returned error:', result);
          setError(result.error || 'No jobs found matching your criteria.');
          setJobs([]);
        }
      } catch (error) {
        console.error('Error in fetchJobs:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          response: error.response?.data
        });
        setError(`Failed to load jobs: ${error.message}. Please try again later.`);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [location.search, location.state?.category, searchQuery, locationQuery, experienceLevel, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.set('search', searchQuery);
    if (locationQuery) queryParams.set('location', locationQuery);
    if (experienceLevel) queryParams.set('experience', experienceLevel);

    navigate(`/jobs?${queryParams.toString()}`);
  };

  const renderJobListings = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading jobs...</div>
        </div>
      );
    }

    if (error) {
      return <div className="error-container">{error}</div>;
    }

    if (jobs.length === 0) {
      return (
        <div className="no-jobs-container">
          <div className="no-jobs">No jobs found</div>
        </div>
      );
    }

    return (
      <div className="job-cards">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  };



  const renderSearchInterface = () => (
    <div className="search-container" style={{
      width: '100%',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      padding: '10px 150px',
      borderBottom: '1px solid #D0D4DC'
    }}>
    <span style={{
      color: '#191919',
      textAlign: 'center',
      fontFamily: 'var(--FontFamily, Inter)',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal'
    }}>Search Jobs</span>
      <Form className="search-form" onSubmit={handleSearch} style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div className="jl-form-item" style={{
        
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          margin: 0,
          gap: '8px',
          borderRadius: '8px 0 0 8px',
          border: '1px solid #D0D4DC',
          background: '#f2f2f2',
          width: '333px',
          minWidth: '250px',
          boxSizing: 'border-box'
        }}>
          <img src={search} alt="Search icon" style={{
            
            left: '15px',
            width: '24px',
            height: '24px',
            color: '#6c757d'
          }} />
          <Form.Control
            type="text"
            placeholder="Enter jobs, skills, company"
            aria-label="Job search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: 0,
              boxShadow: 'none',
              width: '100%',
              height: '100%',
              fontSize: '14px'
            }}
          />
        </div>

        <div className="jl-form-item" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: '8px',
          margin: 0,
          border: '1px solid #D0D4DC',
          background: '#f5f5f5',
          width: '333px',
          minWidth: '180px',
          boxSizing: 'border-box'
        }}>
          <img src={locationinjoblist} alt="Location icon" style={{
            width: '24px',
            height: '24px',
            color: '#6c757d'
          }} />
          <Form.Control
            type="text"
            placeholder="Location"
            aria-label="Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: 0,
              boxShadow: 'none',
              width: '100%',
              height: '100%',
              fontSize: '14px'
            }}
          />
        </div>

        <div className="jl-form-item" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: '8px',
          margin: 0,
          border: '1px solid #D0D4DC',
          background: '#f5f5f5',
          width: '220px',
          minWidth: '160px',
          boxSizing: 'border-box'
        }}>
          <img src={experience} alt="Experience icon" style={{
            width: '24px',
            height: '24px',
            color: '#6c757d'
          }} />
          <Form.Select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: 0,
              boxShadow: 'none',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              fontSize: '14px',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              color: '#495057'
            }}
          >
            <option value="">Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-2 years">0-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </Form.Select>
        </div>

        <Button
          type="submit"
          className="jl-find-jobs-btn"
          style={{
            backgroundColor: '#1993e3',
            color: '#fff',
            border: 'none',
            padding: '11px 39px 11px 35px',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            height: '44px',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          <img src={findjobsearch} alt="Find jobs" style={{ width: '24px', height: '24px' }} />
          Find Jobs
        </Button>
      </Form>
    </div>
  );

  return (
    <div className="jobs-page">
      <div className="job-listings-container">
        {renderSearchInterface()}
        <div className="jobs-grid" style={{ padding: '20px 150px' }}>
          <div className="job-listings">
            {renderJobListings()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListings;
