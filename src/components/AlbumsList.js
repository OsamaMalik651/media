import React from 'react'

const AlbumsList = ({ user }) => {
    return (
        <div className='flex items-center justify-center container'>Albums for {user.name}</div>
    )
}

export default AlbumsList