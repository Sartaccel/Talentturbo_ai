import { Container, Row, Col } from 'react-bootstrap'
import '../styles/Footer.css'
import facebooklogo from '../../assets/Images/Footer/facebook.svg'
import instagramlogo from '../../assets/Images/Footer/instagram.svg'
import linkedinlogo from '../../assets/Images/Footer/linkedin.svg'
import youtubelogo from '../../assets/Images/Footer/youtube.svg'

const Footer = () => {
  return (
    <footer className="bg-white" style={{ padding: '0 150px', margin: 0 }}>
      <Container style={{ margin: '0' }}>
        {/* Top Section */}
        <Row  style={{ margin: 0, padding: '60px 0' }}>
          {/* Logo and Social */}
          <Col lg={5} md={12} style={{
            display: 'flex',
            width: '224px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            margin: 0,
            padding: 0
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: '20px',
              margin: '0'
            }}>
              <h4 className="mb-2 brand-title">TALENT TURBO</h4>
              <p style={{ color: '#1A1A1A', fontFamily: 'var(--FontFamily, Inter)', fontSize: '16px', fontWeight: '400', lineHeight: '21px', margin: 0 }}>Your Gateway to Endless Career Possibilities</p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                width: '142px',
                height: '24px',
              }}>
                {[
                  { icon: linkedinlogo, alt: 'LinkedIn', url: 'https://www.linkedin.com' },
                  { icon: facebooklogo, alt: 'Facebook', url: 'https://www.facebook.com' },
                  { icon: instagramlogo, alt: 'Instagram', url: 'https://www.instagram.com' },
                  { icon: youtubelogo, alt: 'YouTube', url: 'https://www.youtube.com' },
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      
                      aspectRatio: '5/6',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <img 
                      src={social.icon} 
                      alt={social.alt} 
                      
                    />
                  </a>
                ))}
              </div>
            </div>
          </Col>

          {/* Navigation Links */}
          <Col lg={7} md={12} style={{
            margin: 0,
            padding: 0,
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Row style={{
              display: 'flex',
              width: '526px',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem' // equivalent to g-4 gap
            }}>
              {[
                {
                  title: 'Company',
                  links: [
                    { text: 'About us', url: 'about' },
                    { text: 'Careers', url: 'careers' },
                    { text: 'Contact us', url: 'contactus' },
                  ]
                },
                {
                  title: 'Platform',
                  links: [
                    { text: 'Android app', url: '#android' },
                    { text: 'Web Application', url: '#web' },
                  ]
                },
                {
                  title: 'Login',
                  links: [
                    { text: 'Employee', url: '#employee' },
                    { text: 'Candidate', url: '#candidate' },
                  ]
                }
              ].map((section, idx) => (
                <Col key={idx} className="col-auto">
                  <h5 className="h6 fw-semibold mb-3" style={{ fontWeight: '600' }}>{section.title}</h5>
                  <ul className="list-unstyled mb-0">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="mb-2">
                        <a 
                          href={link.url} 
                          className="text-decoration-none footer-link"
                          style={{
                            color: '#1A1A1A',
                            fontFamily: 'var(--FontFamily, Inter)',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: 'normal',
                            textDecoration: 'none'
                          }}
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

      </Container>

      {/* Bottom Section */}
      <div style={{
        display: 'flex',
        height: '50px',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderTop: '1px solid #E6E6E6',
        background: '#FFF',
        width: '100vw',
        marginLeft: '-150px',
        paddingLeft: '150px',
        paddingRight: '150px',
        boxSizing: 'border-box'
      }}>
        <p className="small mb-0" style={{ color: '#1A1A1A', 
          fontFamily: 'var(--FontFamily, Inter)',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal'}}>
          &copy; Talent Turbo. All Rights Reserved. Designed and developed by{' '}
          <a href="#" className="text-decoration-none footer-link" style={{ 
          fontFamily: 'var(--FontFamily, Inter)',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal'}}>EnterKey Solutions</a>
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          color: '#1A1A1A !important',
          fontFamily: 'var(--FontFamily, Inter)',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal'  
        }}>
          <a href="#privacy" className="text-decoration-none footer-link">Privacy Policy</a>
          <a href="#terms" className="text-decoration-none footer-link">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  )
} 

export default Footer
