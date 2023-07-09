import { useState } from 'react'

import { Modal, Button, Collapse, Box } from '@mui/material'

import { ModalPer } from './ModalPer.js'
import { UpdatForm } from './UpdatForm.js'

export function AdminActions ({ open, row, labels, headers, instance, setRows }) {
  const [modalUpdate, setModalUpdate] = useState()
  const [modalDelete, setModalDelete] = useState()
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const handleOpen = () => setModalUpdate(true)
  const handleClose = () => setModalUpdate(false)

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
    <Collapse in={open} timeout="auto" unmountOnExit className='p-2' >

    <Button sx={{ marginRight: '10px' }} variant="contained" onClick={handleOpen} >Update</Button>
    <Button
      sx={{
        ':hover': {
          backgroundColor: '#f51b02',
          color: 'white'
        },
        backgroundColor: 'white',
        color: '#f51b02'
      }}
    variant="contained" onClick={() => setModalDelete(true)} >Delete</Button>

  {/* Modals for updates */}
    <Modal
      open={modalUpdate}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle, width: '700px', height: '500px' }} >
        <h2 className='mb-3' >Ingresa los datos a actualizar</h2>

        <UpdatForm headers={headers} row={row} labels={labels} setPre={setModalPre} setUpd={setModalUpdate} setPreText={setModalPretext} instance={instance} setRows={setRows} />

      </Box>

    </Modal>

    {/* Modal for delete */}

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
            .then(data => setRows(data))
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

    </Collapse>
  )
}
