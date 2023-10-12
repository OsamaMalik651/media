import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/useThunk';

const UsersList = () => {
    // option number 1, loading and error state in the component
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    })
    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    }

    if (isLoadingUsers) {
        return <div><Skeleton times={5} className="h-10 w-full" /></div>
    };
    if (loadingUsersError) {
        return <div>Error fetching data</div>
    }

    const renderedUsers = data.map((user) => {
        return <div key={user.id} className='mb-2 border rounded'>
            <div className='flex p-2 justify-between items-center cursor-pointer'>
                {user.name}
            </div>
        </div>
    })
    return (
        <div>
            <div className='flex justify-between m-3'><h1 className='m-2 text-xl'>List of Users</h1>
                {isCreatingUser ? 'Creating User' : <Button onClick={handleUserAdd}>Add User</Button>}
                {creatingUserError && 'Error creating user'}
            </div>
            {renderedUsers}</div>
    )
}

export default UsersList;