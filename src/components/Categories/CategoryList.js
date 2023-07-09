import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import AdminBtnsPaq from '../SecctionPaquete/AdminBtnsPaq'

// Icons
import FlightIcon from '@mui/icons-material/Flight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { useState } from 'react'
import { ModalsUD } from './ModalsDltUpdt'

const Categories = ({ category, isAdmin, server, getHeadKeys, getHeadVal, setRows, setModalPre, setModalPretext }) => {
  const [modalUpd, setModalUpd] = useState()
  const [modalDlt, setModalDlt] = useState()

  function listItem (ventaja) {
    return (
      <ListItem>
          <CheckCircleIcon className='mr-2 ml-1' />
          <p>{ventaja}</p>
      </ListItem>
    )
  }

  return (
    <>
      <Card sx={{ minHeight: '488px', maxWidth: 345, marginBottom: '10px' }}>
        <CardContent>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', fontFamily: 'Roboto Mono' }}>
          <ListItem>

            <ListItemAvatar>
            <Avatar >
                <FlightIcon />
            </Avatar>
            </ListItemAvatar>

            <h2 className='text-xl' >{category.categoryName}</h2>
          </ListItem>
          {
            category.beneficies.map(venta => {
              return listItem(venta)
            })
          }
        </List>
        {
          isAdmin
            ? <AdminBtnsPaq setDlt={setModalDlt} stUp={setModalUpd} />
            : <></>
        }

        {
            isAdmin
              ? <ModalsUD row={category} headers={getHeadKeys()} instance={server} labels={getHeadVal()} setRows={setRows} setModalPre={setModalPre} setModalPretext={setModalPretext} modalUpd={modalUpd} setModalUpd={setModalUpd} modalDelete={modalDlt} setModalDelete={setModalDlt} />
              : <></>
        }

        </CardContent>

      </Card>
    </>
  )
}

export default Categories
