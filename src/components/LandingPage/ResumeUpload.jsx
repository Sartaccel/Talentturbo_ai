
import React, { useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ResumeUpload.css';
import userImg from '../../assets/Images/ResumeUpload/ResumeUpload.png';
import uploadIcon from '../../assets/Images/ResumeUpload/Upload.svg';
import qrCode from '../../assets/Images/ResumeUpload/qrcode.png';
import mobile1 from '../../assets/Images/ResumeUpload/mobilelarge.png';
import mobile2 from '../../assets/Images/ResumeUpload/mobilesmall.png';
import line from '../../assets/Images/ResumeUpload/Groupline.png';
import playstoreicon from "../../assets/Images/ResumeUpload/playstore.svg";

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf' || 
                selectedFile.type === 'application/msword' || 
                selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setFile(selectedFile);
                setError('');
            } else {
                setError('Please upload a PDF or Word document');
                setFile(null);
            }
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.type === 'application/pdf' || 
                droppedFile.type === 'application/msword' || 
                droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setFile(droppedFile);
                setError('');
            } else {
                setError('Please upload a PDF or Word document');
                setFile(null);
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('http://localhost:8181/api/v1/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            setSuccess('Resume uploaded successfully!');
            setFile(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Error uploading resume');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="resume-upload">
            <Container fluid>
                {/* Top Section - Resume Upload */}
                <Row className="resume-wrapper justify-content-center">
                    <Col xs={12} className="position-relative">
                        <div className="resume-box">
                            <Image src={userImg} alt="Excited User" className="user-img" />
                            <Row className="align-items-center justify-content-center">
                                <Col md={6} lg={3} className="text-center text-md-start">
                                    <h2 className="resume-title">Post your Resume,<br />Get Hired</h2>
                                    <p className="resume-desc">
                                        Upload your resume to get discovered by employers and receive job invitations from recruiters.
                                    </p>
                                </Col>
                                <Col md={6} lg={5} className="upload-section mt-md-0">
                                    <div className="upload-card" 
                                     onDrop={handleDrop} 
                                     onDragOver={handleDragOver}>
                                    <Image src={uploadIcon} alt="Upload" className="upload-icon" />
                                    <p className="upload-text">
                                        {file ? file.name : 'Drag and drop here or'}
                                    </p>
                                    {error && <p className="text-danger">{error}</p>}
                                    {success && <p className="text-success">{success}</p>}
                                    {uploading && <p>Uploading...</p>}
                                        <input
                                            type="file"
                                            id="resume-upload"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <Button 
                                            className="upload-btn"
                                            onClick={() => file ? handleUpload() : document.getElementById('resume-upload').click()}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Uploading...' : (file ? 'Upload Resume' : 'Select File')}
                                        </Button>
                                    </div>
                                </Col>
                                <Image src={line} alt="Decorative line" className="decorative-line" />
                            </Row>
                        </div>
                    </Col>
                </Row>

                {/* Bottom Section - App Download */}
                <Row className="bottom-section align-items-center">
                    <Col lg={5} className="phone-images d-flex justify-content-center position-relative">
                        <Image src={mobile1} alt="Job List Screenshot" className="mobile-img main-phone" />
                        <Image src={mobile2} alt="Job Detail Screenshot" className="mobile-img secondary-phone" />
                    </Col>
                    <Col md={6} lg={3} className="app-section text-center text-md-start">
                        <h3 className="app-title">Jobs You'll Love,<br />Right in Your Pocket</h3>
                        <p className="app-subtitle">Download the mobile app now</p>

                        <Button variant="dark" className="play-store-btn mx-auto mx-md-0" onClick={() => window.open('https://play.google.com/store/apps/details?id=com.talentturbo.referral.android&pcampaignid=web_share', '_blank')}>
                            <div className='img-box'>
                                <Image src={playstoreicon} alt='Google Play Store' className='play-store-img' />
                            </div>
                            <div className='txt-box'>
                                <span className="play-store-text">Get it on</span><br />
                                <span className="play-store-label">Google Play</span>
                            </div>
                        </Button>
                    </Col>
                    <Col md={6} lg={3} className="qr-section mt-4 mt-lg-0 text-center">
                        <Image src={qrCode} alt="QR Code" className="qr-code" />
                        <p className="qr-text mt-2">USE THE QR CODE</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ResumeUpload;