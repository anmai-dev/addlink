import axios from "axios";
import { getAllUserStart, getAllUserSuccess, getAllUserFailure, getAllUserPendingstart, getAllUserPendingSuccess, getAllUserPendingFailed } from "../Slice/UserSlice";


export const getAllUser = async (dispatch) => {
    dispatch(getAllUserStart());
    try {
        const response = await axios.get('/api/u/')
        dispatch(getAllUserSuccess(response.data))
    } catch (error) {
        console.log(error);
        dispatch(getAllUserFailure(error));
    }
};
export const getAllUserPd = async (dispatch) => {
    dispatch(getAllUserPendingstart());
    try {
        const res = await axios.get('/api/u/pd')
        dispatch(getAllUserPendingSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getAllUserPendingFailed())
    }
}