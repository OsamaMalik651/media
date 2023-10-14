import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, erro, album) => {
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id }
                    })
                    tags.push({ type: 'AlbumPhoto', id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET'
                    }
                }
            }),
            AddPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'AlbumPhoto', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.urlLoremFlickr({
                                category: 'abstract',
                                width: 150,
                                height: 150
                            })
                        }
                    }
                }
            }),
            deletePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    }
                }
            })
        }
    }
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi;
export { photosApi }