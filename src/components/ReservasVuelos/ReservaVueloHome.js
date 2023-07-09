import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'

import { setReservasVuelos } from '../../features/Tables/ReservasDeVuelo/infoReservas.js'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { Add } from '@mui/icons-material'

import { AdminModals, AdminUpdate } from './AdminsActions.js'
import Booking from './Booking.js'
import ApiConnection from '../../Server.js'

function CardStr ({ info, id }) {
  const isAdmin = process.env.REACT_APP_ROL.trim() === 'ADMIN'
  const [modalUpdate, setModalUpdate] = useState()
  const [modalDelete, setModalDelete] = useState()

  const Buttons = () => {
    return (
      <>
        <Button onClick={() => setModalUpdate(true)} color='blue' > Update </Button>
        <Button onClick={() => setModalDelete(true) } color='red' >Delete</Button>
      </>
    )
  }

  return (
    <>
    <Card className="mt-6 h-48 shadow-lg shadow-gray-500">
      <CardBody>

        <Typography variant="h5" color="blue-gray" className="mb-2">
          Pasajero: {info.names}
        </Typography>

        <Typography>
          Destino: {info.destination}
        </Typography>

        <Typography>
          Fecha de Salida: {new Date(info.aboarding).toLocaleDateString()}
        </Typography>

      </CardBody>
      <CardFooter className="pt-0 flex flex-row gap-2">

        {
          isAdmin
            ? <Buttons />
            : <></>
        }

      </CardFooter>
    </Card>
    <AdminModals row={{ ...info, id }} modalDelete={modalDelete} setDelete={setModalDelete} />
    <AdminUpdate row={{ ...info, id }} modalUpdate={modalUpdate} setUpdate={setModalUpdate} />
    </>
  )
}

export default function ReservaVuelohome ({ title }) {
  const [modalNew, setModalNew] = useState()
  const isAdmin = process.env.REACT_APP_ROL.trim() === 'ADMIN'

  const reservaVueRoutes = {
    get: '/vuelosReservas',
    put: '/vuelosReservas',
    delete: '/vuelosReservas',
    post: '/vuelosReservas'
  }

  const server = new ApiConnection(reservaVueRoutes)
  const info = useSelector(state => state.infoReVuelos)
  const dispatch = useDispatch()

  useEffect(() => {
    server.getAllData()
      .then(data => dispatch(setReservasVuelos(data)))
  }, [])

  return (
    <>
      <div className="flex flex-row items-center ml-20" >
        <h1 className="mr-2 font-bold text-xl" >{title}</h1>
        <div style={{ width: '155px', height: '1px', border: '1px solid rgb(75 85 99)', marginTop: '2px' }}></div>
      </div>

      <div className='p-4 grid grid gap-3 grid-cols-4 relative' style={{ height: '700px' }} >
      {
        info !== undefined
          ? info.map(inf => {
            const data = {
              ...inf.passengerData,
              ...inf.bookedFlie
            }

            return <CardStr info={data} id={inf.id}/>
          })
          : <></>
      }
      </div>
      {
        isAdmin
          ? <Button onClick={() => setModalNew(true)} variant='contained' className='aboslute bottom-0 left-0 m-2' >
            <Add />
          </Button>
          : <></>

      }

      <Booking modalNew={modalNew} setModalNew={setModalNew} instance={server} />
    </>

  )
}
