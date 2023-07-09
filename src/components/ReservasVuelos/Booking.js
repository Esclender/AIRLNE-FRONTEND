import {
  Button,
  Input
  , Alert,
  Select,
  Option
} from '@material-tailwind/react'

import { Modal, Box } from '@mui/material'

import { useState } from 'react'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { Error } from '@mui/icons-material'

import { ModalPer } from '../DataTableComps/ModalPer.js'

export default function Booking ({ modalNew, setModalNew, instance }) {
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const [error, setError] = useState('hidden')

  const userData = [['Nombres', 'names'], ['Apellidos', 'lastNames'], ['Documento', 'document']]
  const flieData = [['Destino', 'destination'], ['Origen', 'origin'], ['Tarifa', 'price']]
  const values = { passengerData: {}, bookedFlie: { currency: 'USD' } }

  const handleUserClick = (e, user) => {
    values.passengerData = {
      ...values.passengerData,
      [user[1]]: e
    }
  }

  const handleFlieClick = (e, flie) => {
    values.bookedFlie = {
      ...values.bookedFlie,
      [flie[1]]: e
    }
  }

  const handleSubmit = async () => {
    try {
      const { message } = await instance.createData(values)

      setModalNew(false)
      setModalPre(true)
      setModalPretext(message)

      setTimeout(() => setModalPre(false), 1500)
    } catch (error) {
      console.log(values)
      console.log(error)
      setError('')

      setTimeout(() => setError('hidden'), 1500)
    }
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
      open={modalNew}
      onClose={() => setModalNew(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle }} >
        <h2 className='mb-3' >Ingresa los datos a actualizar</h2>
        <Alert className={`bg-red-700 mb-2 ${error}`}
              icon={
                <Error
                  strokeWidth={2}
                  className=" h-6 w-6"
                />
              }
            >
              Rellene todos los campos
        </Alert>

        <h3>Datos del pasajero</h3>
        <div className='mt-2 grid grid-cols-3 gap-2' >

          <DateTimePicker onChange={(e) => handleUserClick(e.toISOString(), ['', 'birthday'])} label="Fecha de nacimiento" />

          {
            userData.map(user => <Input required onChange={(e) => handleUserClick(e.target.value, user)} className='' size="lg" label={user[0]} />)
          }
          <Select label="Tipo de documento"
          onChange={(e) => handleUserClick(e, ['', 'documentType'])}
          >
            <Option value="DNI" >DNI</Option>
            <Option value="CE" >CE</Option>
          </Select>

        </div>

        <h3>Datos del vuelo</h3>
        <div className='mt-2 grid grid-cols-3 gap-2' >

          <DateTimePicker onChange={(e) => handleFlieClick(e.toISOString(), ['', 'aboarding'])} label="Abordaje" />

          <DateTimePicker onChange={(e) => handleFlieClick(e.toISOString(), ['', 'arrival'])} label="Llegada" />

          {
            flieData.map(flie => <Input required onChange={(e) => handleFlieClick(e.target.value, flie)} size="lg" label={flie[0]} />)
          }
        </div>

        <Button onClick={() => handleSubmit()} className='mt-2' variant="contained" >
          Registrar
        </Button>
      </Box>

    </Modal>
    <ModalPer text={modalPreText} opn={modalPre} />
    </>
  )
}
