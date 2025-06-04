import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } from '../Slice/AuthSlice';


export const loginCall = async (User, dispatch, Navigate) => {
    console.log(User);
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/a/login", User);
        dispatch(loginSuccess(res.data));
        Navigate("/")
    } catch (error) {
        dispatch(loginFailure());
    }
};
export const registerCall = async (User, dispatch, Navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('/api/a/register', User, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(registerSuccess());
        Navigate("/login");
    } catch (error) {
        dispatch(registerFailure());
        console.log(error);
    }
}