import React, { useEffect, useRef } from 'react';
import './UserManagement.scss';
import { getAllUserPd } from '../../../redux/apiRequest/UserApiRequest'
// import { getAllUser, deleteUser } from '../../../redux/apiRequest/userApiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Memoized selector
// const selectAllUsers = createSelector(
//     [(state) => state.User.getAllUser?.currentUser],
//     (currentUser) => currentUser
// );

const UserManagement = () => {
    const allUser = useSelector((state) => state.User.getAllUserPending?.currentUser);
    const dispatch = useDispatch();
    // const renderCount = useRef(0);
    // renderCount.current += 1;

    // console.log(`Render lần thứ ${renderCount.current}: allUser`, allUser);

    useEffect(() => {
        getAllUserPd(dispatch);
    }, [dispatch]);



    return (
        <div className="user-management">
            <h2>List User</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(allUser) && allUser.length > 0 ? (
                        allUser.map((userItem, index) => (
                            <tr key={userItem.id || index}>
                                <td>{userItem.username}</td>
                                <td>{userItem.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                Không có người dùng nào.
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default UserManagement;