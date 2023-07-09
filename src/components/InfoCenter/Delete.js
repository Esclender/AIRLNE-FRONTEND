import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setInfo } from '../../features/Tables/tableSlice.js'

import { Modal, Button, Box } from '@mui/material'

import { ModalPer } from '../DataTableComps/ModalPer.js'

import { Typography } from '@material-tailwind/react'

import { Update } from './Update.js'

export function Delete ({ row, instance }) {
  const [modalDelete, setModalDelete] = useState()
  const [modalUpd, setModalUpd] = useState()
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const dispatch = useDispatch()

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

  return (
    <>

      <td className="p-4">

        <Typography as="button" onClick={() => setModalUpd(true) } variant="small" color="blue" className="font-medium">
            Edit
        </Typography>

        <Typography as="button" onClick = {() => setModalDelete(true)} variant="small" color="red" className="font-medium">
          Delete
        </Typography>

      </td>

    <Update row={row} instance={instance} modalUpd={modalUpd} setModalUpd={setModalUpd} />

    <Modal
      open={modalDelete}
      onClose={() => setModalDelete(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle, width: '400px', height: '200px' }} >
        <h2 className='mb-3' >Seguro de que quiere eliminar?</h2>

        <Button sx={{ marginRight: '10px' }} variant="contained" onClick={async () => {
          const { message } = await instance.deleteData(row.id)

          setModalDelete(false)
          setModalPre(true)
          setModalPretext(message)

          instance.getAllData()
            .then(data => dispatch(setInfo(data)))
        }}>
          Si
        </Button>

        <Button
          sx={{
            ':hover': {
              backgroundColor: '#f51b02',
              color: 'white'
            },
            backgroundColor: 'white',
            color: '#f51b02'
          }}
        variant="contained" onClick={() => setModalDelete(false)} >No</Button>
      </Box>

    </Modal>

    <ModalPer opn={modalPre} text={modalPreText} />
    </>
  )
}
