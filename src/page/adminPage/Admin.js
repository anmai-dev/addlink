import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.scss';

const Admin = () => {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate('/signup'); // Đường dẫn tới component tạo tài khoản của bạn
    };

    return (
        <div>
            <button className="create-account-btn" onClick={handleCreateAccount}>
                Tạo tài khoản
            </button>
        </div>
    )
}

export default Admin