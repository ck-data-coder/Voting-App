import React from 'react'
import './contactus.css'
import Footer from '../Footer'
const Contactus = () => {
  return (
  <>
   <header class="contact-header">
        <h1 class="contact-header-title">Contact Us</h1>
        <p class="contact-header-subtitle">We are here to assist you. Reach out to us anytime!</p>
    </header>

    <section class="contact-info-section">
        <div class="contact-info-container">
            <h2 class="contact-info-title">How to Reach Us</h2>
            <p class="contact-info-description">
                For any questions or assistance, contact us using the details below.
            </p>
            <ul class="contact-info-list">
                <li class="contact-info-item"><strong>Email:</strong> support@votingapp.com</li>
                <li class="contact-info-item"><strong>Phone:</strong> +123 456 7890</li>
                <li class="contact-info-item"><strong>Address:</strong> 123 Voting Lane, Democracy City, DC 10001</li>
            </ul>
        </div>
    </section>
    <Footer></Footer>
  </>
  )
}

export default Contactus