import React from 'react'
import Button from './Button'
import { TiDelete } from 'react-icons/ti'
import { useDeletePhotoMutation } from '../store'

const PhotosListItem = ({ photo }) => {

    const [deletePhoto] = useDeletePhotoMutation();
    const handleClick = () => {
        deletePhoto(photo)
    }
    return (
        <div className='w-fit relative cursor-pointer m-2' onClick={handleClick}>
            <img src={photo.url} alt={`random pic ${photo.id}`} className='rounded border h-36 w-36' />
            <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
                <TiDelete className='text-red-600 text-5xl' />
            </div>
        </div>
    )
}

export default PhotosListItem