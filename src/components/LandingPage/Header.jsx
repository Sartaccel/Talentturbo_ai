import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Offcanvas } from 'react-bootstrap';
import { useLocation, Link, useNavigate, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';
import searchIconDark from '../../assets/Images/AboutUs/SearchIconDark.svg';
import person from '../../assets/Images/MobileResponsive/person.svg';
import SearchIcon from '../../assets/Images/MobileResponsive/SearchIcon.svg';

const Header = ({ isLoginPage = false, userType = 'candidate' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileMenu(false);
    }
  };

  const handleLogin = () => {
    const path = userType === 'recruiter' ? '/recruiter/login' : '/login';
    navigate(path);
    setShowMobileMenu(false);
  };

  const handleRegister = () => {
    const path = userType === 'recruiter' ? '/recruiter/register' : '/register';
    navigate(path);
    setShowMobileMenu(false);
  };
  
  // Determine if we're in a recruiter auth page
  const isRecruiterAuth = location.pathname.startsWith('/recruiter/');
  const effectiveUserType = isRecruiterAuth ? 'recruiter' : userType;

  const isJobsPage = location.pathname === '/' || location.pathname === '/jobs';
  const isAboutPage = location.pathname === '/about';
  const isServicesPage = location.pathname === '/services';
  const isContactusPage = location.pathname === '/contactus';
  const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/register');

  return (
    <>
      {/* Mobile Offcanvas Menu */}
      <Offcanvas 
        show={showMobileMenu} 
        onHide={() => setShowMobileMenu(false)}
        className="mobile-offcanvas"
        placement="end"
      >
        <Offcanvas.Header closeButton className="mobile-offcanvas-header">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="mobile-offcanvas-body">
          <div className="mobile-nav-menu">
            <NavLink 
              to="/jobs" 
              state={{ fromSearch: true }}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <img src={searchIconDark} alt="Search" className="mobile-nav-icon" />
              <span>Search</span>
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              Services
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/recruiter" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              For Recruiters
            </NavLink>
          </div>
          <div className="mobile-auth-buttons">
            <Button 
              variant="outline-primary" 
              className="mobile-login-btn"
              onClick={() => {
                handleLogin();
                setShowMobileMenu(false);
              }}
            >
              Login
            </Button>
            <Button 
              variant="primary" 
              className="mobile-signup-btn"
              onClick={() => {
                handleRegister();
                setShowMobileMenu(false);
              }}
            >
              {isLoginPage || isAboutPage || isServicesPage || isJobsPage || isContactusPage ? 'Register' : 'Signup'}
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Header */}
      <Navbar 
        expand="lg" 
        className={`services-navbar white-header ${location.pathname === '/' ? 'landing-navbar' : ''} ${scrolled ? 'scrolled' : ''}`} 
        style={{ padding: '0 150px' }}
      >
        <Container fluid className="p-0" style={{ maxWidth: '100%' }}>
          <div className="d-flex align-items-center w-100">
            {/* Mobile Menu Toggle Button */}
            <Button 
              variant="link" 
              className="mobile-menu-toggle d-lg-none p-0" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle navigation"
            >
              <FaBars size={24} />
            </Button>
            
            {/* Logo/Brand - Visible on all screen sizes */}
            <Navbar.Brand 
              as={Link} 
              to="/" 
              className={`navbar-brand ${location.pathname === '/' ? 'landing-brand' : 'other-page-brand'}`}
              style={{
                color: '#1993E3',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              TALENT TURBO
            </Navbar.Brand>
            
            {/* Mobile Icons - Only visible on mobile */}
            <div className="d-flex ms-auto d-lg-none align-items-center">
              <Button 
                variant="link" 
                className="mobile-icon-btn"
                onClick={() => navigate('/jobs')}
              >
                <img src={searchIconDark} alt="Search" className="mobile-header-icon" />
              </Button>
              <Button 
                variant="link" 
                className="mobile-icon-btn"
                onClick={handleLogin}
              >
                <img src={person} alt="Profile" className="mobile-header-icon" />
              </Button>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <div className="nav-menu">
              <NavLink 
                to="/jobs" 
                state={{ fromSearch: true }}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} ${location.pathname === '/' ? 'landing-nav' : ''}`}
              >
                <img 
                  src={searchIconDark} 
                  alt="Search" 
                  className="nav-icon"
                />
                <span>Search</span>
              </NavLink>
              <NavLink 
                to="/services" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} ${location.pathname === '/' ? 'landing-nav' : ''}`}
              >
                Services
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} ${location.pathname === '/' ? 'landing-nav' : ''}`}
              >
                About Us
              </NavLink>
              <NavLink 
                to="/recruiter" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} ${location.pathname === '/' ? 'landing-nav' : ''}`}
              >
                For Recruiters
              </NavLink>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="auth-buttons d-none d-lg-flex align-items-center">
              <Button 
                onClick={handleLogin} 
                variant="link"
                className={`login-btn ${!isMobile ? 'desktop-login-btn' : ''} ${location.pathname === '/' ? 'landing-login' : 'other-page-login'}`}
              >
                Login
              </Button>
              <Button 
                onClick={handleRegister} 
                variant={isJobsPage ? 'primary' : (isAboutPage || isServicesPage || isContactusPage) ? 'primary' : 'btn-primary'} 
                className={`signup-btn ${(isAboutPage || isServicesPage || isContactusPage) ? 'text-white' : ''}`}
              >
                {/* {isLoginPage || isAboutPage || isServicesPage || isJobsPage || isContactusPage ? 'Register' : 'Signup'} */}
                Register
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
