import React from 'react'
import './aboutus.css'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
const Aboutus = () => {
  return (
  <>
   <header class="about-header">
        <h1 class="about-header-title">About Us</h1>
        <p class="about-header-subtitle">Your trusted platform for secure and transparent voting</p>
    </header>

    <section class="about-section">
        <h2 class="about-section-title">Who We Are</h2>
        <p class="about-section-description">
            Welcome to the Voting App, your go-to platform for conducting and participating in elections with ease and confidence. 
            We are committed to providing secure, transparent, and efficient voting solutions to individuals, organizations, and institutions.
        </p>
    </section>

    <section class="mission-section">
        <h2 class="mission-section-title">Our Mission</h2>
        <p class="mission-section-description">
            At Voting App, our mission is to simplify the voting process while ensuring the highest standards of security and transparency. 
            We believe that every vote matters and that everyone should have access to a platform that makes voting easy and accessible from anywhere in the world.
        </p>
    </section>

    <section class="team-section">
        <h2 class="team-section-title">Meet Our Team</h2>
        <div class="team-members-container">
            <div class="team-member">
                <img src="https://via.placeholder.com/150" alt="Team Member" class="team-member-image"/>
                <h3 class="team-member-name">John Doe</h3>
                <p class="team-member-role">CEO & Founder</p>
            </div>
            <div class="team-member">
                <img src="https://via.placeholder.com/150" alt="Team Member" class="team-member-image"/>
                <h3 class="team-member-name">Jane Smith</h3>
                <p class="team-member-role">Head of Technology</p>
            </div>
            <div class="team-member">
                <img src="https://via.placeholder.com/150" alt="Team Member" class="team-member-image"/>
                <h3 class="team-member-name">Emily Johnson</h3>
                <p class="team-member-role">Product Manager</p>
            </div>
        </div>
    </section>

    <section class="call-to-action-section">
        <h2 class="call-to-action-title">Get Involved</h2>
        <p class="call-to-action-description">
            Join us in our mission to promote secure and transparent voting. Sign up today to start participating in secure elections or to create your own voting event.
        </p>
    <Link to={'/signup'}>  <button class="cta-button">Sign Up Now</button></Link>
    </section>
  <Footer></Footer>
  </>
  )
}

export default Aboutus