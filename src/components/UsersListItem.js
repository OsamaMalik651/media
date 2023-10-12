import React from 'react'
import Button from './Button'

import { useThunk } from '../hooks/useThunk'
import { removeUser } from '../store'
import { TiDelete } from 'react-icons/ti'

const UsersListItem = ({ user }) => {
    const [doRemoveUser, isRemovingUser, error] = useThunk(removeUser);
    const handleClick = () => {
        doRemoveUser(user);
    }
    return <div key={user.id} className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor-pointer'>
            <div className='flex flex-row items-center justify-between'>
                {error && <div>Error deleting user</div>}
                <Button loading={isRemovingUser} onClick={handleClick} className=' border-none'>
                    <TiDelete className='text-red-600 text-3xl' />
                </Button>
                {user.name}
            </div>
        </div>
    </div>

}

export default UsersListItem