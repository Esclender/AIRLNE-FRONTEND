import { useState } from 'react'

import RegistroLogin from './Register'
import FormularioLogin from './Login'
import UserInfo from './UserInfo'
import ApiClientConnection from '../../ServerClient'

export default function ClienteHome ({ routes }) {
  const [openReg, setReg] = useState()
  const [openLog, setLog] = useState(true)

  const server = new ApiClientConnection(routes)

  return (
    <>
      {
        openLog
          ? <FormularioLogin server={server} setLog={setLog} setReg={setReg} />
          : <></>
      }
      {
        openReg
          ? <RegistroLogin routes={routes} setLog={setLog} setReg={setReg} />
          : <></>
      }
      <UserInfo server={server} />
    </>
  )
}
