import React from 'react'
import Button from './Button'

import { useThunk } from '../hooks/useThunk'
import { removeUser } from '../store'
import { TiDelete } from 'react-icons/ti'
import ExpandablePanel from './ExpandablePanel'
import AlbumsList from './AlbumsList'

const UsersListItem = ({ user }) => {
    const [doRemoveUser, isRemovingUser, error] = useThunk(removeUser);
    const handleClick = () => {
        doRemoveUser(user);
    }

    const header = <>
        <Button loading={isRemovingUser} onClick={handleClick} className=' border-none'>
            <TiDelete className='text-red-600 text-3xl' />
        </Button>
        {error && <div>Error deleting user</div>}
        {user.name}
    </>;
    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );

}

export default UsersListItem