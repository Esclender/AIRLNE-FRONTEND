import { createSlice } from '@reduxjs/toolkit'

export const tableSlice = createSlice({
  name: 'infoRows',
  initialState: [],
  reducers: {
    setInfo: (state, action) => {
      state.splice(0, state.length)
      state.push(...action.payload)
    }
  }
})

export const { setInfo } = tableSlice.actions

export default tableSlice.reducer
