import React from 'react';
import { Col } from 'react-bootstrap';
import search from '../../assets/Images/WhyChooseUs/Search.svg';
import searchlogo from '../../assets/Images/WhyChooseUs/Searchlogo.svg' ;
import refer from '../../assets/Images/WhyChooseUs/Refer.svg' ;
import rupeelogo from '../../assets/Images/WhyChooseUs/Rupee.svg' ;
import freelance from '../../assets/Images/WhyChooseUs/Freelance.svg' ;
import laptoplogo from '../../assets/Images/WhyChooseUs/hugeicons_laptop.svg' ;
import './LoginFeatureCarousel.css';

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

const LoginFeatureCarousel = () => {
  return (
    <div className="login-feature-carousel-container">
      {features.map((feature, index) => (
        <Col 
          md={6} 
          lg={4} 
          key={index} 
          className="d-flex justify-content-center login-feature-carousel-item login-feature-slide-left"
          style={{ animationDelay: `${index * 2}s` }}
        >
          <div className="login-feature-card">
            <div className={`login-feature-top-img ${feature.title === 'Freelance interviewer' ? 'freelancer' : ''}`}>
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
      ))}
    </div>
  );
};

export default LoginFeatureCarousel;
