
import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import { TiDelete } from 'react-icons/ti'
import { useDeleteAlbumMutation } from '../store'
import PhotosList from './PhotosList'



const AlbumListItem = ({ album }) => {
    const [deleteAlbum, results] = useDeleteAlbumMutation();

    const handleClick = () => {
        deleteAlbum(album)
    }
    const header = <>
        <Button onClick={handleClick} className='border-none'>
            <TiDelete className='text-red-600 text-3xl' />
        </Button>
        {album.title}</>
    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}

export default AlbumListItem