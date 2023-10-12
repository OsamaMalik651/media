import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';

const UsersList = () => {
    // option number 1, loading and error state in the component
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);

    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUserError, setCreatingUserError] = useState(false);

    const dispatch = useDispatch();
    const { data } = useSelector((state) => {
        return state.users;
    })
    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .catch((err) => setLoadingUsersError(err))
            .finally(() => setIsLoadingUsers(false))
    }, [dispatch]);

    const handleUserAdd = () => {
        setIsCreatingUser(true)
        dispatch(addUser())
            .unwrap()
            .catch((err) => setCreatingUserError(err))
            .finally(() => setIsCreatingUser(false))
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