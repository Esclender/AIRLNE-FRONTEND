import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

import logo from '../assets/Logo.png'

const Navbar = () => {
  const buttons = [
    'Vuelos',
    'Hoteles',
    'Paquetes',
    'Reservas',
    'Reclamos',
    'PasajeroFrecuente',
    'Categorias',
    'Pasajeros'
  ]

  return (
    <nav className="bg-hero w-100 h-14 flex flex-row " >
      <img src={logo} className=" w-50 h-10 pt-1.5" alt="" />

      <div className="flex flex-row justify-end pr-3 pt-1.5 gap-4" style={{ width: '87%' }}>

        {
          buttons.map((button, index) => {
            return (
              <Button className='p-2
                font-[Roboto Mono]
                rounded-2xl bg-transparent font-thin
                hover:bg-white hover:text-hero'>
                  <Link to={`/${button.toLowerCase()}`} >{button}</Link>
              </Button>
            )
          })
        }
      </div>
    </nav>
  )
}

export default Navbar
