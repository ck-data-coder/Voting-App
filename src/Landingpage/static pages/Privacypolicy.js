import React from 'react'
import './privacypolicy.css'
import Footer from '../Footer'
const Privacypolicy = () => {
  return (
    <>
     <header class="privacy-header">
        <h1 class="privacy-header-title">Privacy Policy</h1>
    </header>

    <section class="privacy-content-section">
        <div class="privacy-content-container">
            <h2 class="privacy-content-title">Introduction</h2>
            <p class="privacy-content-text">
                At Voting App, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.
            </p>

            <h2 class="privacy-content-title">Information We Collect</h2>
            <p class="privacy-content-text">
                We may collect the following information when you use our services:
                <ul class="privacy-list">
                    <li>Your name and contact details, such as email address and phone number.</li>
                    <li>Information about how you use our app, including your voting history and preferences.</li>
                    <li>Any other information you voluntarily provide.</li>
                </ul>
            </p>

            <h2 class="privacy-content-title">How We Use Your Information</h2>
            <p class="privacy-content-text">
                We use the information we collect for the following purposes:
                <ul class="privacy-list">
                    <li>To provide, operate, and maintain our services.</li>
                    <li>To send you updates about voting, security, and policy changes.</li>
                    <li>To analyze how users interact with our app to improve user experience.</li>
                </ul>
            </p>

            <h2 class="privacy-content-title">How We Protect Your Information</h2>
            <p class="privacy-content-text">
                We implement security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use encryption and secure servers to store data.
            </p>

            <h2 class="privacy-content-title">Changes to This Policy</h2>
            <p class="privacy-content-text">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2 class="privacy-content-title">Contact Us</h2>
            <p class="privacy-content-text">
                If you have any questions about this Privacy Policy, please contact us at: <strong>privacy@votingapp.com</strong>.
            </p>
        </div>
    </section>
      <Footer></Footer>
    </>
  )
}

export default Privacypolicy