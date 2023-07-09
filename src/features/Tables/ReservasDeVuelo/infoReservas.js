import { createSlice } from '@reduxjs/toolkit'

export const tableVuelosReSlice = createSlice({
  name: 'reservasVuelos',
  initialState: [],
  reducers: {
    setReservasVuelos: (state, action) => {
      console.log(action.payload)
      state.splice(0, state.length)
      state.push(...action.payload)
    }
  }
})

export const { setReservasVuelos } = tableVuelosReSlice.actions

export default tableVuelosReSlice.reducer
