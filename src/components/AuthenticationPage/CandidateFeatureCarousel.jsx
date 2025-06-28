import React from 'react';
import { Col } from 'react-bootstrap';
import search from '../../assets/Images/WhyChooseUs/Search.svg';
import searchlogo from '../../assets/Images/WhyChooseUs/Searchlogo.svg' ;
import refer from '../../assets/Images/WhyChooseUs/Refer.svg' ;
import rupeelogo from '../../assets/Images/WhyChooseUs/Rupee.svg' ;
import freelance from '../../assets/Images/WhyChooseUs/Freelance.svg' ;
import laptoplogo from '../../assets/Images/WhyChooseUs/hugeicons_laptop.svg' ;
import './CandidateFeatureCarousel.css';

const features = [
  {
    topImg: search,
    logo: searchlogo,
    title: 'Search. Match. Apply',
    description: 'Explore thousands of exciting opportunities and apply for roles that align with your profile and goals.'
  },
  {
    topImg: refer,
    logo: rupeelogo,
    title: 'Refer & Earn',
    description: "Refer your talented friends for job positions or to TalentTurbo, and if they're hired, you'll receive a referral bonus!"
  },
  {
    topImg: freelance,
    logo: laptoplogo,
    title: 'Freelance interviewer',
    description: "Apply to be an interviewer, we'll verify your skills, then you can start interviewing and begin earning!"
  }
];

const CandidateFeatureCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="candidate-feature-carousel-container">
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
            className={`d-flex justify-content-center login-feature-carousel-item ${position}`}
          >
            <div className="login-feature-card">
              <div className="login-feature-top-img">
                <img src={feature.topImg} alt="top visual" />
              </div>
              <div className="login-feature-content">
                <div className="login-feature-header">
                  <div className="login-feature-icon">
                    <img src={feature.logo} alt="icon" />
                  </div>
                  <h3 className="login-feature-title">{feature.title}</h3>
                </div>
                <p className="login-feature-description">{feature.description}</p>
              </div>
            </div>
          </Col>
        );
      })}
    </div>
  );
};

export default CandidateFeatureCarousel;
