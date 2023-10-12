import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/useThunk';

import UsersListItem from './UsersListItem';

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

    if (loadingUsersError) {
        return <div>Error fetching data</div>
    }


    let content;
    if (isLoadingUsers) {
        content = <div><Skeleton times={5} className="h-10 w-full" /></div>;
    } else if (creatingUserError) {
        content = <div>Error fetching data</div>;
    } else {
        content = data.map((user) => {

            return <UsersListItem key={user.id} user={user} />
        })
    }
    return (
        <div>
            <div className='flex justify-between items-center m-3'><h1 className='m-2 text-xl'>List of Users</h1>
                <Button onClick={handleUserAdd} loading={isCreatingUser}>+ Add User</Button>
                {creatingUserError && 'Error creating user'}
            </div>
            {content}

        </div>
    )
}

export default UsersList;