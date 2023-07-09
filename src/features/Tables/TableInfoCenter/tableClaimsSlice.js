import { createSlice } from '@reduxjs/toolkit'

export const tableClaimsSlice = createSlice({
  name: 'infoClaimsRows',
  initialState: [],
  reducers: {
    setInfoClaims: (state, action) => {
      state.splice(0, state.length)
      state.push(...action.payload)
    }
  }
})

export const { setInfoClaims } = tableClaimsSlice.actions

export default tableClaimsSlice.reducer
