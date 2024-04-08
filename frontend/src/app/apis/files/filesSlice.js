import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  files: [],
  allFiles: []
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles(state, action) {
      state.files = action.payload
    },
    setAllFiles(state, action) {
      state.allFiles = action.payload
    },
    showAllFiles(state, action) {
      state.files = state.allFiles
    },
  },
})

export default filesSlice.reducer
export const {setFiles, setAllFiles, showAllFiles} = filesSlice.actions
