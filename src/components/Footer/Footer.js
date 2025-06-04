import React from 'react'
import './Footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <p>&copy; 2024 LinkWrap. All rights reserved.</p>
                <div className='footer-links'>
                    <a href='/about'>About Us</a>
                    <a href='/contact'>Contact</a>
                    <a href='/privacy'>Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer