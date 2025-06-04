import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const User = useSelector((state) => state.Auth.login?.currentUser)
    return (
        <div className='homePage'>
            <div className='intro-section'>

                {User ? (
                    <>
                        <h1>Welcome to LinkWrap 🤝</h1>
                        <Link to='/create-x'><button>Start Now! ♥️</button></Link>

                    </>
                ) : (
                    <>
                        <p>👉LinkWrap is your go-to solution for wrapping and managing your links efficiently. Whether you're a marketer, influencer, or just someone who loves sharing links, our service provides you with the tools you need to succeed.</p>
                        <p>(👉LinkWrap là giải pháp phù hợp để gói và quản lý các liên kết của bạn một cách hiệu quả. Cho dù bạn là nhà tiếp thị, người có ảnh hưởng hay chỉ là người yêu thích chia sẻ liên kết, dịch vụ của chúng tôi đều cung cấp cho bạn những công cụ cần thiết để thành công.)</p>
                        <p>💯To get started, please register for our service and unlock the full potential of LinkWrap.</p>
                        <p>(💯Để bắt đầu, vui lòng đăng ký dịch vụ của chúng tôi và khám phá toàn bộ tiềm năng của LinkWrap.)</p>
                        <p>♥️✔️Create your account now and start wrapping your links!</p>
                        <p>(♥️✔️Tạo tài khoản của bạn ngay bây giờ và bắt đầu gói các liên kết của bạn!)</p>
                        <p>☎contact us at-maivanantdc02@gmail.com or phone number-0839592579</p>
                        <p>(☎Liên hệ chúng tôi tại maivanantdc02@gmail.com hoặc số điện thoại 0839592579)</p>
                        {/* <Link to='/signup' className='register-button'>Register Now</Link> */}
                        <Link to='/contact' className='contact-button'>Contact Us</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;