import React, { useState, useCallback } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/Slice/AuthSlice';

const Navbar = () => {
    const User = useSelector((state) => state.Auth.login?.currentUser);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true);
        try {
            await dispatch(logout()).unwrap(); // Giả sử logout trả về Promise
            setIsMenuOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
            // Có thể thêm thông báo lỗi tại đây (VD: dùng react-toastify)
        } finally {
            setIsLoggingOut(false);
        }
    }, [dispatch]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <div className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>

            <div className='navbar-left'>
                <Link to='/'>
                    <i className="fa-solid fa-link" aria-hidden="true"></i>
                    <span className="sr-only">LinkWrap</span> LinkWrap
                </Link>
            </div>

            <div
                className="hamburger-menu"
                onClick={toggleMenu}
                aria-label="Mở hoặc đóng menu"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        toggleMenu();
                    }
                }}
            >
                <i className="fas fa-bars" aria-hidden="true"></i>
            </div>

            <div className='navbar-right'>
                {User && (
                    <>
                        {User.admin && (
                            <div className='admin-panel'>
                                <Link to='/admin-panel' aria-label="Bảng quản trị">
                                    <i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i>
                                </Link>
                            </div>
                        )}
                        <div className='create-X'>
                            <Link to='/create-x'>
                                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i> TWITTER
                            </Link>
                        </div>
                        <div className='create-facebook'>
                            <Link to='/create-facebook'>
                                <i className="fa-brands fa-facebook" aria-hidden="true"></i> FACEBOOK
                            </Link>
                        </div>
                        <div className='logout'>
                            <button onClick={handleLogout} disabled={isLoggingOut}>
                                {isLoggingOut ? (
                                    <span className="loading-spinner">
                                        <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Đang đăng xuất...
                                    </span>
                                ) : (
                                    'Đăng xuất'
                                )}
                            </button>
                        </div>
                    </>
                )}
                {!User && (
                    <div className='login'>
                        <Link to='/login'>Đăng nhập</Link>
                    </div>
                )}
            </div>

            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} aria-hidden={!isMenuOpen}>
                <div
                    className="close-menu"
                    onClick={closeMenu}
                    aria-label="Đóng menu"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            closeMenu();
                        }
                    }}
                >
                    <i className="fas fa-times" aria-hidden="true"></i>
                </div>
                <div className="mobile-menu-items">
                    {User && (
                        <>
                            {User.admin && (
                                <Link to='/admin-panel' onClick={closeMenu}>
                                    <i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i>
                                    Bảng quản trị
                                </Link>
                            )}
                            <Link to='/create-x' onClick={closeMenu} className="twitter-link">
                                <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                                TWITTER
                            </Link>
                            <Link to='/create-facebook' onClick={closeMenu}>
                                <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                                FACEBOOK
                            </Link>
                            <button className="logout-mobile" onClick={handleLogout} disabled={isLoggingOut}>
                                {isLoggingOut ? (
                                    <span className="loading-spinner">
                                        <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Đang đăng xuất...
                                    </span>
                                ) : (
                                    <>
                                        <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                                        Đăng xuất
                                    </>
                                )}
                            </button>
                        </>
                    )}
                    {!User && (
                        <Link to='/login' onClick={closeMenu}>
                            <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className="overlay"
                    onClick={closeMenu}
                    aria-hidden="true"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            closeMenu();
                        }
                    }}
                ></div>
            )}
        </div>
    );
};

export default Navbar;