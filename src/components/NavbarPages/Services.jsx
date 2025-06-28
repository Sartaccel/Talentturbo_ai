import React from 'react';
import './Services.css';
import img1 from '../../assets/Images/ServicesImg/img1.svg';
import img2 from '../../assets/Images/ServicesImg/img2.svg';
import img3 from '../../assets/Images/ServicesImg/img3.svg';
import img4 from '../../assets/Images/ServicesImg/img4.svg';
import img5 from '../../assets/Images/ServicesImg/img5.svg';

function Services() {
    return (
        <div className="services-container">
            <div className="services-item">
                <div className="services-item-image">
                    <img src={img1} alt="img1" />
                </div>
                <div className="services-item-content">
                    <h2 className="services-item-title">Permission Based Sharing</h2>
                    <p className="services-item-description">This platform efficiently handles numerous client job postings at once, showcasing them with client permission to quickly match talent. It securely utilizes untapped resumes and connects job markets, recruiters, and clients with qualified candidates. The system also collects crucial screening data from interviewers to assist in final selections.</p>
                </div>
            </div>
            <div className="services-item">
                <div className="services-item-content">
                    <h2 className="services-item-title">Interview as a Service</h2>
                    <p className="services-item-description">The Talent Turbo platform offers a trust-based secure network for clients to connect with candidates for an effective and accurate recruiting workflow. For a smooth and rapid hiring workflow, our Interview-as-a-Service can conduct pre-screening, screening, interviewing and background verification (if needed) of candidates. Verified candidates get a Talent Turbo badge as certified and qualified as a resourcing fit.</p>
                </div>
                <div className="services-item-image">
                    <img src={img2} alt="img2" />
                </div>
            </div>
            <div className="services-item">
                <div className="services-item-image">
                    <img src={img3} alt="img3" />
                </div>
                <div className="services-item-content">
                    <h2 className="services-item-title">GIG Economy-based screening</h2>
                    <p className="services-item-description">The Talent Turbo platform offers work flexibility for interviewers. Aggregated interviewers can dedicate time at their convenience, without rigid commitments or fixed contracts. The platform's Gig Economy-based screening services, match Talent Turbo verified candidates with interviewers.</p>
                </div>
            </div>
            <div className="services-item">
                <div className="services-item-content">
                    <h2 className="services-item-title">Referral as a Service</h2>
                    <p className="services-item-description">The platform integrates a loyalty program for individuals and agencies who refer friends, colleagues, and family members to build a trustworthy pool of active and passive job seekers. This will aggregate a robust pool of candidates to match with job orders from clients.</p>
                </div>
                <div className="services-item-image">
                    <img src={img4} alt="img4" />
                </div>
            </div>
            <div className="services-item">
                <div className="services-item-image">
                    <img src={img5} alt="img5" />
                </div>
                <div className="services-item-content">
                    <h2 className="services-item-title">GIG Economy-based screening</h2>
                    <p className="services-item-description">The Talent Turbo platform offers work flexibility for interviewers. Aggregated interviewers can dedicate time at their convenience, without rigid commitments or fixed contracts. The platform's Gig Economy-based screening services, match Talent Turbo verified candidates with interviewers.</p>
                </div>
            </div>
        </div>
    );
}

export default Services;
