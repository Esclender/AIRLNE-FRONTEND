import { Modal, Box } from '@mui/material'
import { Button as Btn } from '@material-tailwind/react'
import { Check } from '@mui/icons-material'

export function ModalPer ({ text, opn, setOpn }) {
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
    <Modal
    open={opn}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >

    <Box sx={{ ...boxStyle, width: '400px', height: '400px' }} >
      <div className='text-2xl ml-2 mt-32 text-center' >
        <Check sx={{ color: '#0f0', fontSize: '42px' }} />
        <h2>{text}</h2>
        {
        setOpn !== undefined
          ? <Btn color="red" onClick={() => setOpn(false)} >Close</Btn>
          : <></>
        }
      </div>

    </Box>

  </Modal>
  )
}
