import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';
import herosection from '../../assets/Images/HeroSection/herosection.svg';  
import search from '../../assets/Images/HeroSection/search.svg';
import findjobsearch from '../../assets/Images/HeroSection/Findjobsearch.svg';
import location from '../../assets/Images/HeroSection/location.svg';
import experience from '../../assets/Images/HeroSection/experience.svg';


const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchQuery) {
      queryParams.set('search', searchQuery);
    }
    if (locationQuery) {
      queryParams.set('location', locationQuery);
    }
    if (experienceLevel) {
      queryParams.set('experience', experienceLevel);
    }

    navigate(`/jobs?${queryParams.toString()}`);
  };

  return (
    <div className="hero-wrapper">
      <div className="hero-content-wrapper">
        <Row className="align-items-center hero-content">
<<<<<<< HEAD
          <Col lg={5} className="hero-text-col">
            <h1 className="hero-title">Discover Your Dream Job</h1>
            <p className="hero-subtitle">From entry-level positions to executive roles</p>
=======
          <Col lg={6} className="hero-text-col">
            <h1 className="hero-title">Discover Your Dream Job <br /> From entry-level positions to executive roles</h1>
>>>>>>> 26aacc651f136c5ff759e733de8f8bfd65561dc4
          </Col>
          <Col lg={6} className="hero-image-col">
            <img src={herosection} alt="People working together" className="hero-image" />
          </Col>
        </Row>
      </div>
      
      <div className="search-form-wrapper">
        <div className="search-form-container">
<<<<<<< HEAD
          <span className="search-jobs-title" style={{
=======
          <span style={{  
>>>>>>> 26aacc651f136c5ff759e733de8f8bfd65561dc4
            color: '#111928',
            fontFamily: 'var(--FontFamily, Inter)',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '600',
            textAlign: 'center',
<<<<<<< HEAD
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '20px'
          }}>Search Jobs</span>
=======
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '20px'}}>Search Jobs</span>
>>>>>>> 26aacc651f136c5ff759e733de8f8bfd65561dc4
          <Form className="search-form" onSubmit={handleSubmit}>
            <div className="search-bar">
              <div className="form-item">
                <img src={search} alt="Search icon" className="form-icon" aria-hidden="true" />
                <Form.Control 
                  type="text" 
                  placeholder="Enter jobs, skills, company" 
                  aria-label="Job search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="form-item">
                <img src={location} alt="Location icon" className="form-icon" aria-hidden="true" />
                <Form.Control 
                  type="text" 
                  placeholder="Location" 
                  aria-label="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="form-item">
                <img src={experience} alt="Experience icon" className="form-icon" aria-hidden="true" />
                <Form.Select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="search-select"
                  aria-label="Experience level"
                >
                  <option value="">Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5+ years">5+ years</option>
                </Form.Select>
              </div>
              <Button type="submit" className="find-jobs-btn">
                <img src={findjobsearch} alt="" className="btn-icon" aria-hidden="true" />
                <span>Find jobs</span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
