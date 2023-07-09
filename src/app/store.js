import { configureStore } from '@reduxjs/toolkit'

import tableInfo from '../features/Tables/tableSlice.js'
import tableClaimsInfo from '../features/Tables/TableInfoCenter/tableClaimsSlice.js'
import tableClientInfo from '../features/Tables/ClienteFrecuente/infoClient.js'
import tableVuelosReSlice from '../features/Tables/ReservasDeVuelo/infoReservas.js'

export const store = configureStore({
  reducer: {
    infoRows: tableInfo,
    infoClaims: tableClaimsInfo,
    infoClient: tableClientInfo,
    infoReVuelos: tableVuelosReSlice
  }
})
