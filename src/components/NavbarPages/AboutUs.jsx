import React from 'react';
import './AboutUs.css';
import group from '../../assets/Images/AboutUs/group.svg';
function AboutUs() {
  return (
    <div className="aboutus">
      <section className="aboutus-hero">
        <div className="aboutus-container">
          <div className="aboutus-hero-content">
            <h1 className="aboutus-hero-title">TALENT TURBO</h1>
            <p className="aboutus-hero-subtitle">Internet of humans</p>
          </div>
          <div className="aboutus-hero-image">
            <img src={group} alt="group" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="aboutus-section" id="about">
        <div className="aboutus-section-container">
          <h2 className="aboutus-section-title">About Us</h2>
          
          <div className="aboutus-section-content">
            <div className="aboutus-section-item">
              <h3>TalentTurbo</h3>
              <p>
              Talent Turbo is a distributed talent aggregation and recruitment-as-a-service platform. We have Uberized the talent sourcing and screening process. Our data driven workflow is massively scalable, partner driven, accountable and effective. We simplify recruitment and make it collaborative, and scalable.
              </p>
            </div>

            <div className="aboutus-section-item">
              <h3>Our Mission</h3>
              <p>
              Talent Turbo is a distributed talent aggregation and recruitment-as-a-service platform. We have Uberized the talent sourcing and screening process. Our data driven workflow is massively scalable, partner driven, accountable and effective. We simplify recruitment and make it collaborative, and scalable.
              </p>
            </div>

            <div className="aboutus-section-item">
              <h3>Our Vision</h3>
              <p>
              Talent Turbo is a distributed talent aggregation and recruitment-as-a-service platform. We have Uberized the talent sourcing and screening process. Our data driven workflow is massively scalable, partner driven, accountable and effective. We simplify recruitment and make it collaborative, and scalable.
              </p>
            </div>

            <div className="aboutus-section-item">
              <h3>Our Model</h3>
              <p>
              The platform uses data pools and algorithms to connect the dots between resourcing platforms like Job Boards, Hiring Agencies, Vendor Management Systems, Applicant Tracking Systems and enterprises. The platform effortlessly sources, screens, and matches the right applicants with enterprise talent requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;