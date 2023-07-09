import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'

import { ModalPer } from '../DataTableComps/ModalPer.js'
import { CreateOnePaq } from './CreateOnePaq.js'

import CardPaquete from './CardPaquete.js'
import ApiConnection from '../../Server.js'

const DataTablePaq = ({ route }) => {
  const [rows, setRows] = useState()
  const [modalNew, setModalNew] = useState()
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const isAdmin = process.env.REACT_APP_ROL.trim() === 'ADMIN'
  const server = new ApiConnection(route)

  const paquete = {
    packageName: 'Paquete Chile',
    origin: 'Peru',
    destination: 'Chile',
    since: '2023-09-12T13:30:00.000+00:00',
    to: '2023-09-12T13:30:00.000+00:00'
  }

  const hotelesHeaders = {
    packageName: 'Nombre del paquete',
    origin: 'Origen',
    destination: 'Destino',
    since: 'Desde',
    to: 'Hasta'
  }

  const stickStyle = {
    position: 'sticky',
    bottom: 0
  }

  function getHeadVal () {
    return Object.values(hotelesHeaders)
  }

  function getHeadKeys () {
    return Object.keys(hotelesHeaders)
  }

  useEffect(() => {
    server.getAllData()
      .then(data => setRows(data))
  }, [])

  function CreatePaq () {
    return (
      <div className="p-4" style={stickStyle}>
        <Button variant='contained' startIcon={<Add />} sx={{ padding: '10px', paddingLeft: '20px', fontSize: '45px', boxShadow: 3, borderRadius: '20px', backgroundColor: 'blue' }} onClick={() => setModalNew(true)} />

        <CreateOnePaq row={paquete} headers={getHeadKeys()} instance={server} labels={getHeadVal()} setRows={setRows} setModalPre={setModalPre} setModalPretext={setModalPretext} setModalNew={setModalNew} modalNew={modalNew} />
      </div>
    )
  }

  return (
    <>
      <div className="ml-20 mt-8 shadow-lg shadow-gray-700  relative" style={{ width: '80%', height: '600px', overflowY: 'scroll' }} >
        {
          rows !== undefined
            ? rows.map(row => <CardPaquete row={row} isAdmin={isAdmin} origin={row.origin} packName={row.packageName} dest={row.destination} since={row.avaibleDates.since} to={row.avaibleDates.to} instance={server} setRows={setRows} />)
            : <></>
        }

        {
          isAdmin
            ? <CreatePaq />
            : <></>
        }

        <ModalPer opn={modalPre} text={modalPreText} />
      </div>

    </>
  )
}

export default DataTablePaq
