import React from 'react';
import './Contact.scss';

const Contact = () => {
    return (
        <div className='contact-container'>
            <h2>Contact Us</h2>
            <p>If you have any questions or need support, feel free to reach out to us!</p>
            <div className='contact-info'>
                <div className='qr-code'>
                    <img src='/qrcontact.jpg' alt='QR Code' />
                </div>
                <div className='contact-details'>
                    <p>Email: maivanantdc02@gmail.com</p>
                    <p>Phone: +84 839592579</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;