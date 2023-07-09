import { createSlice } from '@reduxjs/toolkit'

export const tableinfoClientSlice = createSlice({
  name: 'clientInfo',
  initialState: {},
  reducers: {
    setInfoClient: (state, action) => {
      if (action.payload.names) {
        return {
          ...state,
          ...action.payload
        }
      } else {
        return {}
      }
    }
  }
})

export const { setInfoClient } = tableinfoClientSlice.actions

export default tableinfoClientSlice.reducer
