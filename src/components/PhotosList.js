import React from 'react'
import PhotosListItem from './PhotosListItem'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store'
import Skeleton from './Skeleton';
import Button from './Button';

const PhotosList = ({ album }) => {
    const { data, error, isLoading, isFetching } = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    const handleClick = () => {
        addPhoto(album)
    }
    let content;
    if (isFetching) {
        content = <Skeleton times={3} className="h-8 w-8" />
    } else if (error) {
        content = <div>Error loading Photos...</div>
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />
        })
    };
    return (
        <div className=''>
            <div className='flex flex-row items-center justify-between m-2'>
                <h3 className='text-lg font-bold'>Photos for {album.title}</h3>
                <Button onClick={handleClick} loading={results.isLoading}>+ Add Photo</Button>
            </div>
            <div className='mx-8 flex flex-row flex-wrap justify-center'>{content}</div>
        </div>
    )
}

export default PhotosList