import React from 'react';
import GraceLogo from "../../../assets/images/7.png";
import { footerLinks, socialMedia } from "../../../assets/js/links";
import './PatientPageFooter.css';

const Footer = () => {
  return (
    <section className="footer">
      {/* <div className="footer-container">
        <div className="footer-logo-container">
          <img
            src={GraceLogo}
            alt="GRACE"
            className="footer-logo"
          />
          <p className="footer-text">
            A Depression order, make meaning for your life.
          </p>
        </div>

        <div className="footer-links-container">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className="footer-link-group">
              <h4 className="footer-link-title">{footerlink.title}</h4>
              <ul className="footer-link-list">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className="footer-link-item"
                    style={{ marginBottom: index !== footerlink.links.length - 1 ? '1rem' : '0' }}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}

      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright Ⓒ 2025 GRACE. All Rights Reserved.
        </p>

        <div className="footer-socials">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className="footer-social-icon"
              style={{ marginRight: index !== socialMedia.length - 1 ? '1.5rem' : '0' }}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;