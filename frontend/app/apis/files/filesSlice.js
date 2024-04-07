import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  files: [],
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
})

export default filesSlice.reducer
export const {} = filesSlice.actions
export const setFiles = state => state.files
