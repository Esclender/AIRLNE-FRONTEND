import dayjs from 'dayjs'

import { useState } from 'react'
import { Button as Btn, Input } from '@material-tailwind/react'
import { Modal, Box } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import ApiConnection from '../../Server.js'

import { setReservasVuelos } from '../../features/Tables/ReservasDeVuelo/infoReservas.js'

import { useDispatch } from 'react-redux'

import { ModalPer } from '../DataTableComps/ModalPer.js'

export function AdminModals ({ row, modalDelete, setDelete }) {
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const dispatch = useDispatch()
  const server = new ApiConnection({ get: '/vuelosReservas', delete: '/vuelosReservas' })

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '10px'
  }

  return (
    <>
      <Modal
      open={modalDelete}
      onClose={() => setDelete(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle, width: '400px', height: '200px' }} >
        <h2 className='mb-3' >Seguro de que quiere eliminar?</h2>

        <Btn className='p-2
        font-[Roboto Mono]
        rounded-2xl bg-blue-500 mr-2 font-thin
        hover:bg-white hover:text-hero'
        onClick={async () => {
          console.log(row.id)
          const { message } = await server.deleteData(row.id)

          setDelete(false)
          setModalPre(true)
          setModalPretext(message)

          server.getAllData()
            .then(data => dispatch(setReservasVuelos(data)))

          setTimeout(() => setModalPre(true), 2000)
        }} >
          Si
        </Btn>

        <Btn className='p-2
          font-[Roboto Mono]
          rounded-2xl bg-red-500 font-thin
          hover:bg-white hover:text-hero'
          onClick={() => { setDelete(false) }} >
            No
        </Btn>
      </Box>

    </Modal>

    <ModalPer text={modalPreText} opn={modalPre} />
    </>
  )
}

export function AdminUpdate ({ row, modalUpdate, setUpdate }) {
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const dispatch = useDispatch()

  const server = new ApiConnection({ get: '/vuelosReservas', put: '/vuelosReservas' })

  const flieData = [['Destino', 'destination'], ['Origen', 'origin'], ['Tarifa', 'price']]
  const values = { bookedFlie: { aboarding: row.aboarding, arrival: row.arrival } }

  const handleFlieClick = (e, flie) => {
    values.bookedFlie = {
      ...values.bookedFlie,
      [flie[1]]: e
    }
  }

  const handleSubmit = async () => {
    console.log(values)
    const { message } = await server.updateData(row.id, values)

    setUpdate(false)
    setModalPre(true)
    setModalPretext(message)

    server.getAllData()
      .then(data => dispatch(setReservasVuelos(data)))

    setTimeout(() => setModalPre(false), 1500)
  }

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '10px'
  }

  return (
    <>

    <Modal
      open={modalUpdate}
      onClose={() => setUpdate(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle }} >
        <h2 className='mb-3' >Ingresa los datos a actualizar</h2>

        <h3>Datos del vuelo</h3>
        <div className='mt-2 grid grid-cols-3 gap-2' >

          <DateTimePicker defaultValue={dayjs(values.bookedFlie.aboarding)} onChange={(e) => handleFlieClick(e.toISOString(), ['', 'aboarding'])} label="Abordaje" />

          <DateTimePicker defaultValue={dayjs(values.bookedFlie.arrival)} onChange={(e) => handleFlieClick(e.toISOString(), ['', 'arrival'])} label="Llegada" />

          {
            flieData.map(flie => {
              values.bookedFlie = { ...values.bookedFlie, [flie[1]]: row[flie[1]] }

              return <Input defaultValue={row[flie[1]]} onChange={(e) => handleFlieClick(e.target.value, flie)} size="lg" label={flie[0]} />
            })
          }
        </div>

        <Btn onClick={() => handleSubmit()} className='mt-2' variant="contained" >
          actualizar
        </Btn>
      </Box>

    </Modal>
    <ModalPer text={modalPreText} opn={modalPre} />
    </>
  )
}
