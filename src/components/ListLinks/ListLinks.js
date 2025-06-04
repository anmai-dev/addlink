import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ListLinks.scss';
import { getSlugByUserId } from '../../redux/apiRequest/LinkApiRequest';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ListLinks = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.Auth.login?.currentUser);
    const links = useSelector((state) => state.Link.getSlugByuserId?.slug) || [];
    const [copiedSlug, setCopiedSlug] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log("useEffect user state:", user);
                console.log("useEffect user token:", user?.accessToken);
                if (!user || !user.accessToken) {
                    throw new Error('Không tìm thấy token xác thực');
                }
                await getSlugByUserId(dispatch, user.accessToken);
            } catch (error) {
                console.error("Error getting links:", error);
            }
        };
        getData();
    }, [dispatch, user]);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    };

    const handleCopySlug = (slug) => {
        const fullUrl = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopiedSlug(slug);
            setTimeout(() => setCopiedSlug(null), 2000);
        });
    };

    return (
        <div className="list-links-container">
            <div className="list-links-header">
                <h2>Danh sách Links</h2>
                <Link to="/create-x" className="create-link-button">
                    <i className="fas fa-plus"></i>
                    Tạo Link Mới
                </Link>
            </div>
            <div className="links-grid">
                {links.map((link) => (
                    <div key={link._id} className="link-card">
                        <div className="link-image">
                            <img src={link.image} alt={link.title} />
                        </div>
                        <div className="link-info">
                            <h3>{link.title}</h3>
                            <p>{link.description}</p>
                            <div className="link-details">
                                <div className="link-meta">
                                    <div className="slug-container">
                                        <span className="slug">/{link.slug}</span>
                                        <button
                                            className="copy-button"
                                            onClick={() => handleCopySlug(link.slug)}
                                            title="Copy URL để chia sẻ"
                                        >
                                            {copiedSlug === link.slug ? (
                                                <i className="fas fa-check"></i>
                                            ) : (
                                                <i className="far fa-copy"></i>
                                            )}
                                        </button>
                                    </div>
                                    <span className="date">
                                        <i className="far fa-clock"></i>
                                        {formatDate(link.createdAt)}
                                    </span>
                                </div>
                                <div className="link-actions">
                                    <a href={link.destination} target="_blank" rel="noopener noreferrer" className="destination">
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                    <button className="edit-button">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListLinks; 