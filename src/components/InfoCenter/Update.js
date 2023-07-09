import {
  Input,
  Select,
  Button,
  Option,
  Textarea
} from '@material-tailwind/react'

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Modal, Box } from '@mui/material'

import { ModalPer } from '../DataTableComps/ModalPer.js'
import { setInfo } from '../../features/Tables/tableSlice.js'

export function Update ({ row, instance, modalUpd, setModalUpd }) {
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const typeClaim = useSelector(state => state.infoClaims)
  const dispatch = useDispatch()
  const value = { ...row }

  const handleChangeSelect = (e, head) => {
    value[head] = typeof e === 'string' ? e : e.target.value
  }

  const handleChange = (eve, head) => {
    value.userData = { ...value.userData, [head]: eve.target.value }
  }

  const handleSend = async () => {
    const data = {
      userData: value.userData,
      comment: value.comment,
      claimnType: value.claimType
    }

    const { message } = await instance.updateData(value.id, data)

    setModalUpd(false)
    setModalPre(true)
    setModalPretext(message)

    instance.getAllData()
      .then(datas => dispatch(setInfo(datas)))

    setTimeout(() => setModalPre(false), 1500)
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
    <Modal
      open={modalUpd}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={{ ...boxStyle }} >
        <h2 className='mb-3' >Ingresa los datos a actualizar</h2>

        <div className="mb-4 flex flex-col gap-6 grid grid-cols-2">
          <Input defaultValue={row.userData.name} onChange={(e) => handleChange(e, 'name')} size="lg" label="Name" />

          <Input defaultValue={row.userData.lastname} onChange={(e) => handleChange(e, 'lastname')} size="lg" label="Apellido" />

          <Input defaultValue={row.userData.prefix} onChange={(e) => handleChange(e, 'prefix')} size="lg" label="Prejifo telefonico" />

          <Input defaultValue={row.userData.contactNum} onChange={(e) => handleChange(e, 'contactNum')} size="lg" label="Numero telefonico" />

          <Input defaultValue={row.userData.email} onChange={(e) => handleChange(e, 'email')} size="lg" label="Email" />

          <Textarea defaultValue={row.comment} onChange={(e) => handleChangeSelect(e, 'comment')}
          size="lg" label="Comentario" />

          <Select
            value={row.claimType}
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

        <Button onClick={handleSend} className="mt-6" fullWidth>
          Registrar reclamo
        </Button>

        <Button type="submit" onClick={() => setModalUpd(false)} className="mt-6 bg-red-500" fullWidth>
          Cancelar
        </Button>

      </Box>

    </Modal>

    <ModalPer opn={modalPre} text={modalPreText} />
    </>
  )
}
