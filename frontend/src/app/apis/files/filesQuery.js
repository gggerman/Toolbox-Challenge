import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const filesApi = createApi({
  reducerPath: 'filesQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers, {getState}) => {
      headers.set('authorization', 'Bearer aSuperSecretKey')
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['files'],
  endpoints: builder => ({
    getFiles: builder.query({
      query: () => ({
          url: `/files/data`,
          method: 'GET'
      }),
      providersTags: ['files'],
    }),
    getFilesList: builder.query({
      query: () => ({
          url: `/files/list`,
          method: 'GET'
      }),
      providersTags: ['files'],
    }),
    getFile: builder.mutation({
      query: (fileName) => ({
          url: `/files/data?fileName=${fileName}`,
          method: 'GET'
      }),
      providersTags: ['files'],
    }),
  }),
})

export const {
  useGetFilesQuery,
  useGetFilesListQuery,
  useGetFileMutation,
  middleware,
} = filesApi
export default filesApi.reducer
