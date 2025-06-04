import React, { useState, useCallback } from 'react';
import './CreateImgToLink.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createLink } from '../../redux/apiRequest/LinkApiRequest';
import { Link } from 'react-router-dom';

const CreateImgToLink = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [destination, setDestination] = useState('');
    const [slug, setSlug] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.Auth.login?.currentUser);

    const handleDestinationChange = useCallback((e) => {
        const value = e.target.value;
        if (value && !/^https?:\/\//i.test(value)) {
            setDestination('https://' + value); // Tự động thêm https://
        } else {
            setDestination(value);
        }
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoading(true);
            setError(null); // Reset lỗi

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('destination', destination);
            formData.append('slug', slug);
            // Không cần append userId vì backend đã xử lý

            if (image) {
                formData.append('image', image);
            }

            try {
                if (!user || !user.accessToken) {
                    throw new Error('Không tìm thấy token xác thực');
                }
                await createLink(dispatch, formData, user.accessToken);
                // Reset form sau khi tạo thành công
                setImage(null);
                setTitle('');
                setDescription('');
                setDestination('');
                setSlug('');
            } catch (error) {
                console.error('Error creating link:', error);
                setError(error.message || 'Có lỗi khi tạo link, vui lòng thử lại!');
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch, user, image, title, description, destination, slug]
    );

    return (
        <div className="create-link-container">
            <div className="create-link-form">
                <h2>Tạo Link Mới</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="alt image(vd: full movie)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="không nhập tại đây! "
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        name="destination"
                        placeholder="Link đích (VD: https://...)"
                        value={destination}
                        onChange={handleDestinationChange}
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        name="slug"
                        placeholder="Slug (VD: san-pham-abc)"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                Đang tạo...
                            </div>
                        ) : (
                            'Tạo Link'
                        )}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
            <div className="view-links-section">
                <Link to="/list-links" className="view-links-button">
                    <i className="fas fa-list"></i>
                    Xem danh sách links
                </Link>
            </div>
        </div>
    );
};

export default CreateImgToLink;