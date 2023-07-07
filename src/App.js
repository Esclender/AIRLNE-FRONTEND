import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Route, Routes } from 'react-router-dom';


import Navbar from "./components/Navbar.js"
import Hero from "./components/Hero.js"
import Secction from "./components/Secction.js"
import SecctionPaquete from './components/SecctionPaquete.js';
import SecctionFormCliente from './components/SecctionClienteFr.js';

import SectionCat from './components/Categories/CategoriesSec.js';
import SecctionForm from './components/SectionFormulario.js';

import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
  const vuelosHeaders = {
    destination: 'Destino',
    origin: 'Origen',
    arrival: 'Llegada',
    aboarding: 'Abordaje',
    price: 'Tarifa ($)'
  }

  const vuelosRoutes = {
    get: "/vuelos",
    put: "/vuelos",
    delete: "/vuelos",
    post: "/vuelos"
  }

  const hotelesHeaders = {
    nameHotel: 'Hotel',
    city: 'Ciudad',
    rating: 'Rating'
  }

  const hotelesRoutes = {
    get: "/hotel",
    put: "/hotel/reservas",
    delete: "/hotel/reservas",
    post: "/hotel/reservas"
  }

  const pasajeroHeaders = {
    name: 'Nombre',
    lastName: 'Apellido',
    age: 'Edad',
    passport_N:"Numero de pasaporte"
  }

  const pasajeroRoutes = {
    get: "/pasajero",
    put: "/pasajero",
    delete: "/pasajero",
    post: "/pasajero"
  }

  return (

    <Provider store={store} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Hero />

        <Routes>
          <Route path='/vuelos' element={
            <Secction title='Vuelos' id='vuelos' info={vuelosHeaders} route={vuelosRoutes} />
          }/>

          <Route path='/hoteles' element={
            <Secction title='Hoteles' id={'hoteles'} info={hotelesHeaders} route={hotelesRoutes} />
          }/>

          <Route path='/pasajeros' element={
            <Secction title='Pasajeros' id='pasajeros' info={pasajeroHeaders} route={pasajeroRoutes} />
          }/>

          <Route path='/paquetes' element={
            <SecctionPaquete id="paquete" title="Paquetes" />
          }/>

          <Route path='/categorias' element={
            <SectionCat />
          }/> 

          <Route path='/categorias' element={
            <SectionCat />
          }/> 

          <Route path='/reclamos' element={
            <SecctionForm id="infocenter" title="Info center"  />
          }/> 

          <Route path='/pasajerofrecuente' element={
            <SecctionFormCliente id="cliente" title="Cliente Frecuente"  />
          }/> 

        </Routes>
      </LocalizationProvider>
    </Provider>

  );
}

export default App;
