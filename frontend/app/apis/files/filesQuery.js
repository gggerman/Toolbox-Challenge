import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const filesApi = createApi({
  reducerPath: 'filesQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
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
  }),
})

export const {
  useGetFilesQuery,
  middleware,
} = filesApi
export default filesApi.reducer
