import React from 'react';
import { Col } from 'react-bootstrap';
import searchlogo from '../../assets/Images/WhyChooseUs/Searchlogo.svg' ;
import rupeelogo from '../../assets/Images/WhyChooseUs/Rupee.svg' ;
import laptoplogo from '../../assets/Images/WhyChooseUs/hugeicons_laptop.svg' ;
import login1 from '../../assets/Images/RecruiterPage/login1.svg' ;
import login2 from '../../assets/Images/RecruiterPage/login2.svg' ;
import login3 from '../../assets/Images/RecruiterPage/login3.svg' ;
import login4 from '../../assets/Images/RecruiterPage/login4.svg' ;
import './RecruiterFeatureCarousel.css';

const features = [
  {
    topImg: login1,
    logo: searchlogo,
    title: 'TalentTurbo for recruiters',
    description: 'We connect you to the best talent and job opportunities with speed,precision, and a streamlined process.'
  },
  {
    topImg: login2,
    logo: rupeelogo,
    title: 'Company dashboard',
    description: 'The central command center to manage company details, post jobs, and view recruitment analytics.'
  },
  {
    topImg: login3,
    logo: laptoplogo,
    title: '50,000+ Candidates',
    description: 'Explore 50,000+ candidate profiles. View candidate details, contact info, and directly invite candidates.'
  },
  {
    topImg: login4,
    logo: searchlogo,
    title: '2,000 + Interviewers',
    description: 'Access our network of pre-vetted interviewers and assign them to candidates directly through the app.'
  }

];

const RecruiterFeatureCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="recruiter-feature-carousel-container">
      {features.map((feature, index) => {
        // Calculate position classes
        let position = 'next';
        if (index === currentIndex) position = 'active';
        if (index === currentIndex - 1 || (currentIndex === 0 && index === features.length - 1)) {
          position = 'prev';
        }
        
        return (
          <Col 
            md={6} 
            lg={4} 
            key={index}
            className={`d-flex justify-content-center recruiter-feature-carousel-item ${position}`}
          >
            <div className="recruiter-feature-card">
              <div className="recruiter-feature-top-img">
                <img src={feature.topImg} alt="top visual" />
              </div>
              <div className="recruiter-feature-content">
                <div className="recruiter-feature-header">
                  <div className="recruiter-feature-icon">
                    <img src={feature.logo} alt="icon" />
                  </div>
                  <h3 className="recruiter-feature-title">{feature.title}</h3>
                </div>
                <p className="recruiter-feature-description">{feature.description}</p>
              </div>
            </div>
          </Col>
        );
      })}
    </div>
  );
};

export default RecruiterFeatureCarousel;
