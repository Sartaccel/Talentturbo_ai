import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import HowItWorks from './HowItWorks';
import CompanyProfile from './CompanyProfile';
import JobPostings from './JobPostings';
import Footer from '../LandingPage/Footer';
import styles from './RecruiterPage.module.css';
import AiPowered from './AiPowered';
import CandidateProfiles from './CandidateProfiles';
import AssesmentsSection from './AssesmentsSection';
import CallToActionSection from './CallToActionSection';

const RecruiterPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <CompanyProfile />
        <JobPostings />
        <AiPowered />
        <CandidateProfiles />
        <AssesmentsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterPage;