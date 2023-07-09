import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Input
} from '@material-tailwind/react'

import { Modal, Box } from '@mui/material'

import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setInfoClient } from '../../features/Tables/ClienteFrecuente/infoClient'

import user from '../../assets/user.png'

import { ModalPer } from '../DataTableComps/ModalPer.js'

export default function UserInfo ({ server }) {
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const [modalDelete, setModalDelete] = useState()
  const [modalUpdate, setModalUpdate] = useState()
  const info = useSelector(state => state.infoClient)
  const dispatch = useDispatch()
  const values = { parameters: {} }

  const isEmpty = Object.values(info) != 0

  const handleDelete = async () => {
    const { message } = await server.deleteData()

    setModalDelete(false)
    setModalPre(true)
    setModalPretext(message)

    dispatch(setInfoClient({}))

    setTimeout(() => { setModalPre(false) }, 2000)
  }

  const handleUpdate = async () => {
    const { message } = await server.updateData(values)

    setModalUpdate(false)
    setModalPre(true)
    setModalPretext(message)

    server.getAllData()
      .then(data => dispatch(setInfoClient(data)))

    setTimeout(() => { setModalPre(false) }, 2000)
  }

  const ShowInfo = () => {
    return (
      <div className="p-2 text-left shadow-sm shadow-gray-700 ">
        <h2>Millas: {info.miles}</h2>
        <h2>Cliente: {info.names} {info.lastnames}</h2>
        <h2>{info.documentType}: {info.document}</h2>
        <h2>Email: {info.email}</h2>

        <Button className='mt-2' color='red' onClick={() => setModalDelete(true)} >Inhabilitar cuenta</Button>

        <Button className='ml-2 mt-2' onClick={() => setModalUpdate(true)} >Update</Button>
      </div>
    )
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
    <Card className="w-96 ml-32 mt-8 shadow-lg shadow-gray-700 relative">

      <CardHeader floated={false} className="h-40 grid place-content-center w-auto">
          <Avatar
          size="xxl"
          alt="avatar"
          src={user}
          className="ring-4 ring-green-500/30 border border-green-500 shadow-xl shadow-green-900/20"
        />
      </CardHeader>

      <CardBody className="text-center">

        {
          isEmpty
            ? <ShowInfo />
            : <></>
        }

      </CardBody>
    </Card>

    <Modal
      open={modalDelete}
      onClose={() => setModalDelete(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle, width: '400px', height: '200px' }} >
        <h2 className='mb-3' >Seguro de que quiere continuar?</h2>

        <Button variant="contained" onClick={handleDelete} >
          Si
        </Button>

        <Button color='red' className='ml-2'
        variant="contained" onClick={() => setModalDelete(false)} >No</Button>
      </Box>

    </Modal>

    {/* UPDATE */}

    <Modal
      open={modalUpdate}
      onClose={() => setModalUpdate(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle, width: '400px', height: '200px' }} >
        <h2 className='mb-3' >Ingresa los datos a actualizar</h2>

        <Input onChange={(e) => { values.parameters = { email: e.target.value } }} defaultValue={info.email} size="lg" label="Email" />

        <Button className='mt-2' variant="contained" onClick={handleUpdate} >
          Update
        </Button>
      </Box>

    </Modal>
    <ModalPer opn={modalPre} text={modalPreText} />
    </>
  )
}
