import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, 
  FaGraduationCap, 
  FaVideo, FaMoneyBillWave, FaCoins, FaEnvelope, FaTelegramPlane, 
  FaWhatsapp, FaRocket,FaFacebook, FaLinkedin, FaTwitter, FaInstagram,FaYoutube,FaTelegram } from 'react-icons/fa';

import './InvestmentPage.css';
import { Link } from 'react-router-dom';


const InvestmentPage = () => {
  return (
    <div className='investment-container'>
    <div className="investment-page">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="title"
      >
        Edubuk | Investment Opportunities
      </motion.h1>

      <motion.p
        className="intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Welcome to the official Investment Page of Edubuk<br></br>a globally awarded,
        blockchain-powered platform revolutionizing academic and professional credentials verification
        and emerging technologies education.
        <br /><br />
        Join us in building the future of education, identity, and employment.
      </motion.p>

      <section className="section about-section">
  <h2><FaGlobe /> About Edubuk</h2>
  <p className="about-intro">
    Edubuk is a one-stop platform for credential verification, skills development,
    and job-matching — powered by Blockchain + AI.
  </p>
  <div className="about-grid">
    <div className="about-card">
      <FaGraduationCap size={24} />
      <h4>CETA Program</h4>
      <p>Certified Emerging Technologies Analyst Program: Learn AI, Blockchain, Data Analytics, IoT, Cloud & more.</p>
    </div>
    <div className="about-card">
      <FaGraduationCap size={24} />
      <h4>eSeal & eVerify</h4>
      <p>Blockchain-based academic & professional certificates that are time-stamped and tamper-proof.</p>
    </div>
    <div className="about-card">
      <FaGraduationCap size={24} />
      <h4>CV-on-Chain</h4>
      <p>Blockchain-verified CVs and resumes, powered with AI job-matching for recruiters worldwide.</p>
    </div>
    <div className="about-card">
      <FaGraduationCap size={24} />
      <h4>AI Olympiad</h4>
      <p>Global competition testing skills in AI, Blockchain, Data Science, Robotics, and more.</p>
    </div>
  </div>
</section>


      <section className="section video-section">
        <h2><FaVideo /> Watch Edubuk in Action</h2>
        <div className="video-box">
        <div className='video-container'>
        <h2>Award</h2>
          <iframe width="300" height="250" src="https://www.youtube.com/embed/42ujKTOMRf8?si=B8GIs3yFB9gyPinB&autoplay=1&mute=1" title="Video 1" allowFullScreen></iframe>
          </div>
          <div className='video-container'>
          <h2>CETA</h2>
          <iframe width="300" height="250" src="https://www.youtube.com/embed/-6fKOysTNo4?si=Nhjgt0ESGkVPvgTU&autoplay=1&mute=1" title="Video 2"  allowFullScreen></iframe>
          </div>
          <div className='video-container'>
          <h2>AI & Olympiad</h2>
          <iframe width="300" height="250" src="https://www.youtube.com/embed/kORadYQBGLY?si=qeQRqdBW7lBwawN8&autoplay=1&mute=1" title="Video 2"  allowFullScreen></iframe>
          </div>
          <div className='video-container'>
          <h2>CV on Chain</h2>
          <iframe width="300" height="250" src="https://www.youtube.com/embed/vVYQXffnI-8?autoplay=1&mute=1" title="Video 2" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section className="section">
        <h2><FaMoneyBillWave /> Investment Options</h2>
        <div className="investment-option">
          <h3>Option 1: Invest in EBUK Tokens <FaCoins /></h3>
          <ul>
            <li>✅ For crypto investors and blockchain backers</li>
            <li>🔗 Native token powering the Edubuk dApp ecosystem</li>
            <li>💰 Min Investment: $2,000</li>
            <li>💰 Max Investment: $50,000</li>
            <li>📈 Tokenomics & whitepaper available post sign-up</li>
          </ul>
          <a href="https://ebukpresale.com" target='_blank' rel="noreferrer" className="cta-button">👉 Click here to Invest in Tokens (EBUK)</a>
        </div>
        <div className="investment-option">
          <h3>Option 2: Invest in Equity</h3>
          <ul>
            <li>✅ For accredited investors or VCs</li>
            <li>💼 Back Edubuk as a startup in the EdTech x Blockchain space</li>
            <li>💵 Min Investment: $50,000</li>
            <li>💵 Max Investment: $150,000</li>
            <li>📄 Equity Terms, Deck & Docs shared upon registration</li>
          </ul>
          <p className="dual-option">
        If you want to invest in Edubuk's equity, you may email us at investment@edubukeseal.org
        </p>
          {/* <a href="#" className="cta-button">👉 Click here to Invest in Equity</a> */}
        </div>

        {/* <p className="dual-option">
        If you want to invest in Edubuk's equity, you may email us at investment@edubukeseal.org
        </p> */}
      </section>

      <section className="section">
        <h2>📧 Questions? Reach out.</h2>
        <p>
          <FaEnvelope /> investment@edubukeseal.org<br />
          <FaWhatsapp /> +91-9250411261<br />
          <FaTelegramPlane /> @edubukofficial
        </p>
      </section>

      <motion.div
        className="join"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <FaRocket /> Join the revolution.
        <p>Be part of a verified, borderless future of skills and credentials.</p>
        <p><Link to="/terms-conditions" id='link'>Terms & Conditions</Link> | <Link to="/privacy-policy" id="link">Privacy Policy</Link></p>
      </motion.div>
    </div>
    <div className='columns'>
        <div className='social-icon'>
          <h2>Follow us on :</h2>
          <a href='https://t.me/edubukofficial' target='_blank' rel='noreferrer'><FaTelegram id='icon'/></a>
          <a href='https://www.facebook.com/edubuk.trst/' target='_blank' rel='noreferrer'><FaFacebook id='icon'/></a>
          <a href='https://www.instagram.com/edubuk_/' target='_blank' rel='noreferrer'><FaInstagram id='icon'/></a>
          <a href='https://www.linkedin.com/company/edubuk-ai-web3/' target='_blank' rel="noreferrer"><FaLinkedin id='icon'/></a>
          <a href='https://x.com/edubuktrust' target='_blank' rel="noreferrer"><FaTwitter id='icon'/></a>
          <a href='https://www.youtube.com/channel/UC4g4MH4F_JTbd1tqNS5pq1g/videos' target='_blank' rel="noreferrer"><FaYoutube id='icon'/></a>
        </div>
        {/* <div>
          <h2>Our Office :</h2>
          <h3>Hyderabad,Telangana</h3>
          <h3>Lucknow, Uttar Pradesh</h3>
          <h3>Dubai, UAE</h3>
        </div> */}
        </div>
    </div>
  );
};

export default InvestmentPage;
