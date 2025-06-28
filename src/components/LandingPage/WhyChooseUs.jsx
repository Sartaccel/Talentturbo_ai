import { Container, Row, Col } from 'react-bootstrap';
import '../styles/WhyChooseUs.css';
import search from '../../assets/Images/WhyChooseUs/Search.svg';
import refer from '../../assets/Images/WhyChooseUs/Refer.svg';
import freelance from '../../assets/Images/WhyChooseUs/Freelance.svg';
import searchlogo from '../../assets/Images/WhyChooseUs/Searchlogo.svg';
import rupeelogo from '../../assets/Images/WhyChooseUs/Rupee.svg';
import laptoplogo from '../../assets/Images/WhyChooseUs/hugeicons_laptop.svg';

const features = [
  {
    topImg: search,
    logo: searchlogo,
    title: 'Search. Match. Apply',
    description: 'Explore thousands of exciting opportunities and apply for roles that align with your profile and goals.',
  },
  {
    topImg: refer,
    logo: rupeelogo,
    title: 'Refer & Earn',
    description: "Refer your talented friends for job positions or to TalentTurbo, and if they're hired, you'll receive a referral bonus!",
  },
  {
    topImg: freelance,
    logo: laptoplogo,
    title: 'Freelance interviewer',
    description: "Apply to be an interviewer, we'll verify your skills, then you can start interviewing and begin earning!",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <Container>
        <Row className="mb-5">
          <Col>
            <h2 className="feature-section-title text-center">Why choose us?</h2>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {features.map((feature, index) => (
            <Col md={6} lg={4} key={index} className="d-flex justify-content-center">
              <div className="feature-card">
                <div className="feature-top-img">
                  <img src={feature.topImg} alt="top visual" />
                </div>
                <div className="feature-content">
                  <div className="feature-header">
                    <div className="feature-icon">
                      <img src={feature.logo} alt="icon" />
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                  </div>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;