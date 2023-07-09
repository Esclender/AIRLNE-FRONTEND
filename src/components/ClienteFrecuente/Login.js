import {
  Card,
  Input,
  Button,
  Typography
} from '@material-tailwind/react'

import { useDispatch } from 'react-redux'

import { setInfoClient } from '../../features/Tables/ClienteFrecuente/infoClient.js'

export default function FormularioLogin ({ server, setLog, setReg }) {
  const dispatch = useDispatch()
  let username = ''
  let password = ''

  const login = () => {
    server.username = username
    server.password = password

    server.getAllData()
      .then(dta => dispatch(setInfoClient(dta)))
  }

  return (
    <>
      <Card className="ml-10 mt-8 shadow-lg shadow-gray-700 relative w-2/5 grid place-content-center p-4" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Ingresa
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
          <Input onChange={(e) => { username = e.target.value }} required size="lg" label="Username" />
          <Input onChange={(e) => { password = e.target.value }} required size="lg" label="Password" />

          </div>

          <Button onClick={() => login()} className="mt-6" fullWidth>
            Continuar
          </Button>

        </form>

        <Button className="mt-6 bg-transparent text-blue-500" onClick={() => {
          setLog(false)
          setReg(true)
        }} fullWidth>
          No tienes cuenta? Registrate aqui
        </Button>
      </Card>

    </>
  )
}
