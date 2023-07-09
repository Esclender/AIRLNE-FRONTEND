import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { List, ListItem, Card, Button as Btn, Chip } from '@material-tailwind/react'
import { FlightLand, FlightTakeoff, CalendarMonth } from '@mui/icons-material'

import { useState } from 'react'

import { Modal, Box, TextField } from '@mui/material'

import AdminBtnsPaq from './AdminBtnsPaq.js'

import { ModalPer } from '../DataTableComps/ModalPer.js'

function CardPaquete ({ row, isAdmin, packName, origin, dest, since, to, instance, setRows }) {
  const values = {
    packageName: packName,
    origin,
    destination: dest,
    avaibleDates: {
      since,
      to
    }
  }

  const [modalUpdate, setUpdt] = useState()
  const [modalDelete, setDelete] = useState()
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '10px'
  }

  function getBody (e, head, date) {
    if (head === 'avaibleDates') {
      const isEmpty = e.target?.value || e.target?.value === ''
      values[head][date] = isEmpty ? e.target.value : e.toISOString()
    } else {
      const isEmpty = e.target?.value || e.target?.value === ''
      values[head] = isEmpty ? e.target.value : e.toISOString()
    }
  }

  async function sendBody () {
    const { message } = await instance.updateData(row.id, values)

    setUpdt(false)
    setModalPre(true)
    setModalPretext(message)

    instance.getAllData()
      .then(data => setRows(data))

    setTimeout(() => setModalPre(false), 1500)
  }

  return (
    <>
      <Card className="w-96 ml-16 mt-8 shadow-lg shadow-gray-700  " style={{ width: '60%' }}>
        <div className="flex flex-row" >
          <List>
            <ListItem disabled className="font-bold opacity-100" >{packName}</ListItem>

            <Chip variant="gradient" value="Todos los vuelos con estos origenes y destinos:" />

            <div className="flex flex-row" >

              <ListItem disabled className="opacity-100 w-auto" >
                <FlightTakeoff className="mr-2" />
                Origen: {origin}
              </ListItem>

              <ListItem disabled className="opacity-100 w-auto" >
                <FlightLand className="mr-2" />
                Destino: {dest}
              </ListItem>

            </div>
          </List>

          <List className="pt-4 pl-4 w-1/2 grid place-content-center">

            <ListItem disabled className=" text-center font-bold opacity-100" >Rango de Disponibilidad</ListItem>

            <div className="flex flex-row">

              <ListItem disabled className="opacity-100" >
                <CalendarMonth className="mr-2" />
                {new Date(since).toLocaleDateString()}
              </ListItem>

              <ListItem disabled className="opacity-100" >
                <CalendarMonth className="mr-2" />
                {new Date(to).toLocaleDateString()}
              </ListItem>

            </div>
          </List>
        </div>

        {
          isAdmin
            ? <AdminBtnsPaq stUp={setUpdt} setDlt={setDelete} />
            : <></>
        }
      </Card>

    <Modal
      open={modalUpdate}
      onClose={() => setUpdt(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle, width: '700px', height: '500px' }} >
        <h2 className='mb-3' >Ingresa los datos a actualizar</h2>

        <div className='flex gap-2 flex-wrap' >
          <TextField label="Nombre del paquete" defaultValue={packName} onChange={(e) => getBody(e, 'packageName')} />

          <TextField label="Origen" defaultValue={origin} onChange={(e) => getBody(e, 'origin')} />

          <TextField label="Destino" defaultValue={dest} onChange={(e) => getBody(e, 'destination')} />

          <DateTimePicker label="Desde" defaultValue={dayjs(since)} onChange={(e) => getBody(e, 'avaibleDates', 'since')} />

          <DateTimePicker label="Hasta" defaultValue={dayjs(to)} onChange={(e) => getBody(e, 'avaibleDates', 'to')} />
        </div>

        <Btn className='p-2
        font-[Roboto Mono]
        rounded-2xl bg-blue-500 mr-2 font-thin
        hover:bg-white hover:text-hero'
        onClick={async () => await sendBody()} >
          Enviar
        </Btn>

        <Btn className='p-2
          font-[Roboto Mono]
          rounded-2xl bg-red-500 font-thin
          hover:bg-white hover:text-hero'
          onClick={() => setUpdt(false) } >
            cancelar
        </Btn>

      </Box>

    </Modal>

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
          const { message } = await instance.deleteData(row.id)

          setDelete(false)
          setModalPre(true)
          setModalPretext(message)

          instance.getAllData()
            .then(data => setRows(data))
        }} >
          Si
        </Btn>

        <Btn className='p-2
          font-[Roboto Mono]
          rounded-2xl bg-red-500 font-thin
          hover:bg-white hover:text-hero'
          onClick={() => {
            setDelete(false)
          }} >
            No
        </Btn>
      </Box>

    </Modal>

    <ModalPer opn={modalPre} text={modalPreText} />
    </>
  )
}

export default CardPaquete
