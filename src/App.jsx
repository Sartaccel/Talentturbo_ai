import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/LandingPage/Header'
import HeroSection from './components/LandingPage/HeroSection'
import Categories from './components/LandingPage/Categories'
import WhyChooseUs from './components/LandingPage/WhyChooseUs'
import ResumeUpload from './components/LandingPage/ResumeUpload'
// import ResumeUpload from './components/ResumeUpload/ResumeUpload'
import Footer from './components/LandingPage/Footer'
// import Job from './components/JobListings/JobCard'
import JobListings from './components/JobListings/JobListings'
import JobDescription from './components/JobDescriptionPage/JobDescription'
import JobDetail from './components/JobDetail/JobDetail'
import RecruiterPage from './components/RecruiterLandingPage/RecruiterPage'
import LoginPage from './components/AuthenticationPage/LoginPage'
import AboutUs from './components/NavbarPages/AboutUs'
import Services from './components/NavbarPages/Services'
import ContactUs from './components/NavbarPages/ContactUs'

function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/recruiter" element={<RecruiterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/about" element={
            <>
              <Header />
              <AboutUs />
              <Footer />
            </>
          } />
          <Route path="/services" element={
            <>
              <Header />
              <Services />
              <Footer />
            </>
          } />
          <Route path="/contactus" element={
            <>
              <Header />
              <ContactUs />
              <Footer />
            </>
          } />

          <Route path="/*" element={
            <>
              <Header />
              <div style={{ paddingTop: '0' }}> {/* This ensures content starts below the fixed header */}
                <Routes>
                  <Route path="/" element={
                    <>
                      <div className="main-layout">
                        <HeroSection />
                      </div>
                      <Categories />
                      <WhyChooseUs />
                      <ResumeUpload />
                    </>
                  } />
                  <Route path="/jobs" element={<JobListings />} />
                  <Route path="/job-description/:jobId" element={<JobDescription />} />
                  <Route path="/job-detail/:jobId" element={<JobDetail />} />
                  {/* <Route path="/job-detail/:jobId" element={<Job />} /> */}
                </Routes>
              </div>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App