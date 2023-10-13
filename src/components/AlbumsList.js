import React from 'react'
import { useCreateAlbumMutation, useFetchAlbumsQuery } from '../store'
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumListItem from './AlbumListItem';

const AlbumsList = ({ user }) => {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useCreateAlbumMutation();

    const handleClick = () => {
        addAlbum(user)
    }

    let content;
    if (isFetching) {
        content = <Skeleton times={3} className="h-10 w-full" />
    } else if (error) {
        content = <div>Error loading albums</div>
    } else {
        content = data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />
        })
    };
    return (
        <div className=''>
            <div className='flex flex-row items-center justify-between m-2'>
                <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
                <Button onClick={handleClick} loading={results.isLoading}>+ Add Album</Button>
            </div>
            <div className='w-full'>{content}</div>
        </div>
    )
}

export default AlbumsList