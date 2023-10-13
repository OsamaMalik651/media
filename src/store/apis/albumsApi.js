import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id }
                    });
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    console.log(tags)
                    return tags
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                },
            }),
            createAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        body: {
                            title: faker.commerce.productName(),
                            userId: user.id
                        },
                        method: 'POST'
                    };
                },
            }),
            deleteAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    console.log(album)
                    return [{ type: 'Album', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});

export const { useFetchAlbumsQuery, useCreateAlbumMutation, useDeleteAlbumMutation } = albumsApi;
export { albumsApi };