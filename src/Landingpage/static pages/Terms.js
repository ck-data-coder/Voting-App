import React from 'react'
import Footer from '../Footer'

const Terms = () => {
  return (
   <>
     <header class="terms-header">
        <h1 class="terms-header-title">Terms of Service</h1>
    </header>

    <section class="terms-content-section">
        <div class="terms-content-container">
            <h2 class="terms-content-title">Introduction</h2>
            <p class="terms-content-text">
                Welcome to Voting App! By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 class="terms-content-title">Acceptance of Terms</h2>
            <p class="terms-content-text">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>

            <h2 class="terms-content-title">User Responsibilities</h2>
            <p class="terms-content-text">
                You agree to:
                <ul class="terms-list">
                    <li>Provide accurate and complete information when using our services.</li>
                    <li>Be responsible for maintaining the confidentiality of your account information.</li>
                    <li>Notify us immediately of any unauthorized use of your account.</li>
                </ul>
            </p>

            <h2 class="terms-content-title">Prohibited Conduct</h2>
            <p class="terms-content-text">
                You agree not to engage in any of the following:
                <ul class="terms-list">
                    <li>Using the service for any unlawful purpose.</li>
                    <li>Attempting to interfere with the service or its security features.</li>
                    <li>Transmitting any harmful or malicious code.</li>
                </ul>
            </p>

            <h2 class="terms-content-title">Limitation of Liability</h2>
            <p class="terms-content-text">
                Voting App is not liable for any indirect, incidental, or consequential damages resulting from your use of our services. We do not guarantee the accuracy or completeness of the information provided.
            </p>

            <h2 class="terms-content-title">Changes to Terms</h2>
            <p class="terms-content-text">
                We reserve the right to update or modify these Terms of Service at any time. Any changes will be effective immediately upon posting on this page.
            </p>

            <h2 class="terms-content-title">Contact Us</h2>
            <p class="terms-content-text">
                If you have any questions about these Terms of Service, please contact us at: <strong>support@votingapp.com</strong>.
            </p>
        </div>
    </section>
    <Footer></Footer>
   </>
  )
}

export default Terms