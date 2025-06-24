import React, { useState } from 'react';
import { Search, Linkedin, Facebook, Instagram, Youtube, ChevronDown } from 'lucide-react';
import './ContactUs.css';
import contractusimg from '../../assets/Images/ContactUs/contractusimg.svg';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    message: ''
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name.replace('contact-us-', '')]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-us">
      <div className="contact-us-background"></div>
      <main className="contact-us-main">
        <div className="contact-us-container">
          <div className="contact-us-left-section">
            <div className="contact-us-left-section-content">
              <div className="contact-us-getintouch">
                <h2>Get in Touch</h2>
                <p>Have a question or need assistance? <br /> Our team is here to help!</p>
              </div>
              <div className="contact-us-illustration">
                <img src={contractusimg} alt="Illustration" />
              </div>
            </div>
          </div>

          <div className="contact-us-right-section">
            <form className="contact-us-form" onSubmit={handleSubmit}>
              <div className="contact-us-form-group">
                <label htmlFor="contact-us-name">Name</label>
                <input
                  type="text"
                  id="contact-us-name"
                  name="contact-us-name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="contact-us-form-group">
                <label htmlFor="contact-us-email">Email</label>
                <input
                  type="email"
                  id="contact-us-email"
                  name="contact-us-email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="contact-us-form-group">
                <label htmlFor="contact-us-mobile">Mobile Number</label>
                <div className="contact-us-mobile-input">
                  <div className="contact-us-country-code-dropdown">
                    <button
                      type="button"
                      className="contact-us-dropdown-toggle"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {countryCode}
                      <ChevronDown className="contact-us-dropdown-icon" />
                    </button>
                    {isDropdownOpen && (
                      <div className="contact-us-dropdown-menu">
                        {["+91", "+1", "+44"].map(code => (
                          <div
                            key={code}
                            className="contact-us-dropdown-item"
                            onClick={() => {
                              setCountryCode(code);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {code}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="contact-us-mobile"
                    name="contact-us-mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-us-form-group">
                <label htmlFor="contact-us-message">Message</label>
                <textarea
                  id="contact-us-message"
                  name="contact-us-message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-us-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactUs;
