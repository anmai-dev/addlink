import { createLinkStart, createLinkSuccess, createLinkFailure, getSlugByuserIdStart, getSlugByuserIdSuccess, getSlugByuserIdFaild } from '../Slice/LinkSlice';
import axios from 'axios';

export const createLink = async (dispatch, formData, token) => {
    dispatch(createLinkStart());
    try {
        // Log dữ liệu gửi đi
        console.log('Request Data:', {
            url: '/',
            headers: {
                'token': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            formData: Object.fromEntries(formData)
        });

        const res = await axios.post('/api', formData, {
            headers: {
                'token': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('Response:', res.data);
        dispatch(createLinkSuccess(res.data));
    } catch (error) {
        // Log chi tiết lỗi
        console.log('Error Details:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers
        });

        dispatch(createLinkFailure());
        console.error('Error creating link:', error);
    }
};
export const getSlugByUserId = async (dispatch, token) => {
    dispatch(getSlugByuserIdStart())
    try {
        console.log("Sending request with token:", token);
        const res = await axios.get('/api/user-slugs', {
            headers: {
                'token': `Bearer ${token}`
            }
        })
        console.log("Response data:", res.data);
        dispatch(getSlugByuserIdSuccess(res.data))
        return res.data;
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        dispatch(getSlugByuserIdFaild())
        throw error;
    }
}


