import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CallToActionSection.css';
import RocketIcon from '../../assets/Images/RecruiterPage/Rocket.png';
import { useNavigate } from 'react-router-dom';

const CallToActionSection = () => {
  const navigate = useNavigate(); 
  return (
    <section className="ctaSection">
      <div className="ctaContainer">
        <div className="ctaContent">
          <div className="ctaVisual">
            <div className="rocketContainer">
              <img src={RocketIcon} alt="Rocket" className="rocketIcon" />
            </div>
          </div>
          <div className="ctaText">
            <h2 className="ctaTitle">Ready to get started</h2>
            <p className="ctaDescription">
              Unlock smarter hiring, streamline your recruitment 
              process, and find your next great hire faster.
            </p>
            <button className="ctaButton" onClick={() => navigate('/register')}>
              Register now
              <ArrowRight className="arrowIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;