import React from 'react';
import { useNavigate } from "react-router-dom";
import './footerStyle.css';

const Footer = () => {
  const navigate = useNavigate();
  
  const handleLinkPress = () => {
    navigate('/submitProject');
  }
  return (
    <footer className="footer">
      {/* Footer content */}
      <div className='addText'>
        <span>Got a project you want want to </span> 
        <a className="addLink" href="" onClick={() => handleLinkPress()}>advertise</a>
        <span>?</span> 
      </div>
    </footer>
  );
};

export default Footer;