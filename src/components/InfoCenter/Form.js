import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
  Select,
  Option,
  Textarea
} from '@material-tailwind/react'
import { Error } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { ModalPer } from '../DataTableComps/ModalPer.js'

import { useDispatch, useSelector } from 'react-redux'

import { setInfo } from '../../features/Tables/tableSlice.js'
import { setInfoClaims } from '../../features/Tables/TableInfoCenter/tableClaimsSlice.js'

import ApiConnection from '../../Server'

export default function FormularioInfo ({ routes }) {
  const [mess, setMess] = useState()
  const [opn, setOpn] = useState()
  const [error, setError] = useState('hidden')
  const server = new ApiConnection(routes)
  const dispatch = useDispatch()
  const typeClaim = useSelector(state => state.infoClaims)
  const value = { userData: {} }

  useEffect(() => {
    server.getAllData()
      .then(data => dispatch(setInfoClaims(data)))
  }, [routes])

  const handleChangeSelect = (e, head) => {
    value[head] = typeof e === 'string' ? e : e.target.value
  }

  const handleChange = (even, head) => {
    value.userData[head] = even.target.value
  }

  const sendData = (e) => {
    e.preventDefault()

    if (value.claimType) {
      server.createData(value)
        .then(({ message }) => {
          setOpn(true)
          setMess(message)
          server.route.get = '/infoCenter'

          server.getAllData()
            .then(data => dispatch(setInfo(data)))
        })

      setTimeout(() => setOpn(false), 3500)
    } else {
      setError('')

      setTimeout(() => setError('hidden'), 1500)
    }
  }

  return (
    <Card className="ml-10 mt-8 shadow-lg shadow-gray-700 relative w-2/5 grid place-content-center p-4" color="transparent" shadow={false}>

      <Typography variant="h4" color="blue-gray">
        Ingresa el reclamo
      </Typography>
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

      <form onSubmit={sendData} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input required onChange={(e) => handleChange(e, 'name')} size="lg" label="Name" />

          <Input required onChange={(e) => handleChange(e, 'lastname')} size="lg" label="Apellido" />

          <Input required onChange={(e) => handleChange(e, 'prefix')} size="lg" label="Prejifo telefonico" />

          <Input required onChange={(e) => handleChange(e, 'contactNum')} size="lg" label="Numero telefonico" />

          <Input required onChange={(e) => handleChange(e, 'email')} size="lg" label="Email" />

          <Textarea required onChange={(e) => handleChangeSelect(e, 'comment')}
          size="lg" label="Comentario" />
          <Select

            label="Tipo de reclamo"
            onChange={(e) => handleChangeSelect(e, 'claimType')}
          >
          {
            typeClaim !== undefined
              ? typeClaim.map(claim => <Option value={claim}>{claim}</Option>)
              : <></>
          }
        </Select>
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Registrar reclamo
        </Button>

      </form>

      {
        mess !== undefined
          ? <ModalPer text={mess} opn={opn} />
          : <></>
      }
    </Card>
  )
}
