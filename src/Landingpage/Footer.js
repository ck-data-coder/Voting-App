import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
   
    <>
    <footer class="footer">
    <div class="footer-content">
        <div class="footer-section about">
            <h2 class="footer-logo">Voting App</h2>
            <p>Your trusted platform for secure and transparent voting.</p>
        </div>
        <div class="footer-section links">
            <h3>Quick Links</h3>
            <ul>
            <li>  <Link to={'/About Us'}>About Us</Link></li>
            <li> <Link to={'/Contact Us'}>Contact Us</Link></li>
            <li>   <Link to={'/Privacy Policy'}> Privacy Policy</Link></li>
            <li> <Link to={'/Terms of Service'}>Terms of Service</Link></li>
            </ul>
        </div>
        <div class="footer-section social">
            <h3>Follow Us</h3>
            <div class="social-icons">
                <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"><img className='social-icon' src={require('./social icons/facebook.png')}></img></a>
                <a href="https://www.twitter.com/" target="_blank" class="fa fa-twitter"><img className='social-icon' src={require('./social icons/twitter.webp')}></img></a>
                <a href="https://www.instagram.com/" target="_blank" class="fa fa-instagram"><img className='social-icon' src={require('./social icons/instagram.png')}></img></a>
                <a href="https://www.linkedin.com/" target="_blank" class="fa fa-linkedin"><img className='social-icon' src={require('./social icons/linkedin.png')}></img></a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        &copy; 2024 Voting App | All rights reserved.
    </div>
</footer>

    
    </>
  )
}

export default Footer