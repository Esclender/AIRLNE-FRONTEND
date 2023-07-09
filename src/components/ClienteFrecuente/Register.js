import {
  Card,
  Input,
  Button,
  Typography
  , Select, Option
} from '@material-tailwind/react'

import { useState } from 'react'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { ModalPer } from '../DataTableComps/ModalPer.js'
import ApiClientConnection from '../../ServerClient.js'

export default function RegistroLogin ({ routes, setLog, setReg }) {
  routes.post = '/regularClient'
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const server = new ApiClientConnection(routes)
  const value = {}

  const handleChangeSelect = (e, head) => {
    value[head] = typeof e === 'string' ? e : e.target.value
  }

  const handleChange = (even, head) => {
    const isEmpty = even?.target?.value || even?.target?.value === ''
    value[head] = isEmpty ? even.target.value : even.toISOString()
  }

  const sendData = async () => {
    const { data } = await server.createData(value)

    setModalPre(true)
    setModalPretext(data)
  }

  return (
    <>
        <Card className="ml-10 mt-8 shadow-lg shadow-gray-700 relative w-2/5 grid place-content-center p-4" color="transparent">

          <Typography variant="h4" color="blue-gray">
            Registrate
          </Typography>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input required onChange={(e) => handleChange(e, 'names')} size="lg" label="Nombres" />

              <Input required onChange={(e) => handleChange(e, 'lastnames')} size="lg" label="Apellidos" />

              <DateTimePicker
              label="Fecha de nacimiento"
              onChange={(e) => handleChange(e, 'birthday')}
              />

              <Input required onChange={(e) => handleChange(e, 'document')} size="lg" label="Documento" />

              <Select
                label="Tipo de documento"
                onChange={(e) => handleChangeSelect(e, 'documentType')}
              >
                <Option value="DNI" >DNI</Option>
                <Option value="CE" >CE</Option>
              </Select>

              <Input required onChange={(e) => handleChange(e, 'email')} size="lg" label="Email" />

              <Input required onChange={(e) => handleChange(e, 'password')} type="password" size="lg" label="Contraseña" />
            </div>

            <Button onClick={async () => sendData()} className="mt-6" fullWidth>
              Registrarme
            </Button>

          </form>

          <Button className="mt-6 bg-transparent text-blue-500" onClick={() => {
            setReg(false)
            setLog(true)
          }} fullWidth>
            Ya tienes cuenta? Ingresa aqui
          </Button>

        </Card>

        <ModalPer text={modalPreText} opn={modalPre} setOpn={setModalPre} />
    </>
  )
}
