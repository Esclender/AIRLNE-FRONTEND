import { Modal, Box, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Button as Btn, Alert } from '@material-tailwind/react'
import { Error } from '@mui/icons-material'

import { useState } from 'react'

export function CreateOne ({ row, headers, instance, setRows, labels, setModalPretext, setModalPre, modalNew, setModalNew }) {
  const [error, setError] = useState('hidden')
  const [values, setValues] = useState({})
  const def = { ...row }

  const isEmptyDate = () => {
    const keys = []
    for (const key in values) {
      keys.push(key)
    }

    return keys.length === headers.length
  }

  function getBody (e, head) {
    const newValues = values
    const isEmpty = e?.target?.value || e?.target?.value === ''
    newValues[head] = isEmpty ? e.target.value : e.toISOString()
    setValues(newValues)
  }

  async function sendBody () {
    if (isEmptyDate()) {
      const data = {
        ...def,
        ...values
      }
      const { message } = await instance.createData(data)

      setModalNew(false)
      setModalPre(true)
      setModalPretext(message)

      instance.getAllData()
        .then(data => setRows(data))

      setTimeout(() => setModalPre(false), 1500)
    } else {
      setError('')

      setTimeout(() => setError('hidden'), 3000)
    }
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

      {/* Modals for new one */}
        <Modal
          open={modalNew}
          onClose={() => setModalNew(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...boxStyle, width: '700px', height: '500px' }} >
            <h2 className='mb-3' >Ingresa los datos </h2>
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

            <div>
              {
                  headers.map((head, i) => {
                    if (new Date(row[head]) == 'Invalid Date' || typeof row[head] === 'number') {
                      return <TextField required sx={textFields} label={labels[i]} variant="outlined" onChange={(e) => getBody(e, head)} />
                    }

                    return null
                  })
              }

              {
                  headers.map((head, i) => {
                    if (new Date(row[head]) != 'Invalid Date' && typeof row[head] !== 'number') {
                      return (
                          <DateTimePicker
                          required
                          sx={textFields}
                          label={labels[i]}
                          onChange={(e) => getBody(e, head)}

                          />
                      )
                    }
                    return null
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
              onClick={() => setModalNew(false) } >
                cancelar
            </Btn>

          </Box>

        </Modal>

    </>
  )
}
