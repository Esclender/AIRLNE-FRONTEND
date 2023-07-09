import { Modal, Box, TextField } from '@mui/material'
import { Button as Btn, Textarea } from '@material-tailwind/react'

import { useState } from 'react'

export const ModalsUD = ({ row, headers, instance, setRows, labels, setModalPretext, setModalPre, modalUpd, setModalUpd, modalDelete, setModalDelete }) => {
  const [values, setValues] = useState({})

  function getBody (e, head) {
    const newValues = values
    const isEmpty = e?.target?.value || e?.target?.value === ''
    newValues[head] = isEmpty ? e.target.value : e.toISOString()
    setValues(newValues)
  }

  function getTextArea (e) {
    const newValues = values
    const isEmpty = e?.target?.value || e?.target?.value === ''
    newValues.beneficies = isEmpty ? e.target.value.split(',') : ''
    setValues(newValues)
  }

  async function sendBody () {
    values.beneficies.map(v => v.trim())

    const { message } = await instance.updateData(row.id, values)

    setModalUpd(false)
    setModalPre(true)
    setModalPretext(message)

    instance.getAllData()
      .then(data => setRows(data))

    setTimeout(() => setModalPre(false), 1500)
  }

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

  const textFields = {
    padding: '5px',
    width: '40%',
    font: '9px',
    marginBottom: '8px'
  }

  return (
    <>

      {/* Modals for update */}
        <Modal
          open={modalUpd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...boxStyle, width: '700px', height: '500px' }} >
            <h2 className='mb-3' >Ingresa los datos a actualizar </h2>

            <div>
              {
                  headers.map((head, i) => {
                    if (head != 'beneficies') {
                      return <TextField required sx={textFields} label={labels[i]} defaultValue={row[head]} variant="outlined" onChange={(e) => getBody(e, head)} />
                    } else {
                      return <Textarea defaultValue={row.beneficies.join(',')} onChange={(e) => getTextArea(e)} label="Beneficios (Separa cada uno de los beneficios con comas)" />
                    }
                  })
              }

              </div>

            <Btn className='p-2
              font-[Roboto Mono]
              rounded-2xl bg-blue-500 mr-2 font-thin
              hover:bg-white hover:text-hero'
              onClick={async (e) => await sendBody()} >
                Enviar
            </Btn>

            <Btn className='p-2
              font-[Roboto Mono]
              rounded-2xl bg-red-500 font-thin
              hover:bg-white hover:text-hero'
              onClick={() => setModalUpd(false) } >
                cancelar
            </Btn>

          </Box>

        </Modal>

      <Modal
      open={modalDelete}
      onClose={() => setModalDelete(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >

      <Box sx={{ ...boxStyle, width: '400px', height: '200px' }} >
        <h2 className='mb-3' >Seguro de que quiere eliminar?</h2>

        <Btn className='p-2
          font-[Roboto Mono]
          rounded-2xl bg-blue-500 mr-2 font-thin
          hover:bg-white hover:text-hero'
          onClick={async (e) => {
            const { message } = await instance.deleteData(row.id)

            setModalDelete(false)
            setModalPre(true)
            setModalPretext(message)
            instance.getAllData()
              .then(data => setRows(data))

            setTimeout(() => setModalPre(false), 1500)
          }} >
            Si
        </Btn>

        <Btn className='p-2
          font-[Roboto Mono]
          rounded-2xl bg-red-500 font-thin
          hover:bg-white hover:text-hero'
          onClick={() => setModalDelete(false) } >
            No
        </Btn>

        </Box>

      </Modal>

    </>
  )
}
