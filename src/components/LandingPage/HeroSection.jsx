import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';
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
    <section className="hero-section">
      <Container fluid className="px-0">
        <div className='hero-text'>
          <h1 className="hero-title">Discover Your Dream Role</h1>
          <p className="hero-subtitle">From entry-level positions to executive roles</p>
        </div>

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
      </Container>
    </section>
  );
};

export default HeroSection;
