import React, { useState } from 'react'
import './Login.scss'
// import { Link } from 'react-router-dom'
import { loginCall } from '../../redux/apiRequest/authApiRequest'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const userLogin = {
            email: email,
            password: password
        }

        try {
            const result = await loginCall(userLogin, dispatch, Navigate);
            if (!result.success && result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError('Đã có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Đăng Nhập</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập địa chỉ email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                        </button>
                    </div>
                </form>
                {/* <div className="signup-link">
                    <p>Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link></p>
                </div> */}

            </div>
        </div>
    )
}

export default Login