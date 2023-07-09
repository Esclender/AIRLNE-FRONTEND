import dayjs from 'dayjs'

import { useState } from 'react'

import { TextField } from '@mui/material'
import { Button as Btn } from '@material-tailwind/react'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export function UpdatForm ({ headers, row, labels, setPre, setUpd, setPreText, instance, setRows }) {
  const [values, setValues] = useState({})

  const textFields = {
    padding: '5px',
    width: '40%',
    font: '9px',
    marginBottom: '8px'
  }

  function getBody (e, head) {
    const newValues = values
    const isEmpty = e.target?.value || e.target?.value === ''
    newValues[head] = isEmpty ? e.target.value : e.toISOString()
    setValues(newValues)
  }

  async function sendBody () {
    const { message } = await instance.updateData(row.id, values)
    console.log(row.id)

    setUpd(false)
    setPre(true)
    setPreText(message)

    instance.getAllData()
      .then(data => setRows(data))
  }

  return (
    <>
      <div>
      {
          headers.map((head, i) => {
            if (new Date(row[head]) == 'Invalid Date' || typeof row[head] == 'number') {
              values[head] = row[head]
              return <TextField sx={textFields} label={labels[i]} defaultValue={values[head]} variant="outlined" id={i} onChange={(e) => getBody(e, head)} />
            }

            return null
          })
      }

      {
          headers.map((head, i) => {
            if (i !== 0) {
              if (new Date(row[head]) != 'Invalid Date' && typeof row[head] != 'number') {
                values[head] = row[head]
                return (
                  <DateTimePicker
                  sx={textFields}
                  label={labels[i]}
                  defaultValue={dayjs(values[head])}
                  onChange={(e) => getBody(e, head)}
                  />
                )
              }
            }

            return null
          })
      }
      </div>

      <Btn className='p-2
        font-[Roboto Mono]
        rounded-2xl bg-blue-500 mr-2 font-thin
        hover:bg-white hover:text-hero'
        onClick={async () => await sendBody()} >
          Enviar
      </Btn>

      <Btn className='p-2
        font-[Roboto Mono]
        rounded-2xl bg-red-500 font-thin
        hover:bg-white hover:text-hero'
        onClick={() => setUpd(false) } >
          cancelar
      </Btn>
    </>
  )
}
