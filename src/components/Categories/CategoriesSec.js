import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'

import ApiConnection from '../../Server'
import Categories from './CategoryList'

import { CreateOneCat } from './CreateOneCat'

import { ModalPer } from '../DataTableComps/ModalPer.js'

const SectionCat = () => {
  const routes = {
    get: '/categoriasVuelos',
    put: '/categoriasVuelos',
    delete: '/categoriasVuelos',
    post: '/categoriasVuelos'
  }

  const [rows, setRows] = useState()
  const [modalNew, setModalNew] = useState()
  const [modalPre, setModalPre] = useState()
  const [modalPreText, setModalPretext] = useState()
  const isAdmin = process.env.REACT_APP_ROL.trim() === 'ADMIN'
  const server = new ApiConnection(routes)

  useEffect(() => {
    server.getAllData()
      .then(data => setRows(data))
  }, [])

  const categoriaHeaders = {
    categoryName: 'Nombre de la categoria',
    price: 'Precio',
    beneficies: 'Beneficios'
  }

  const stickStyle = {
    position: 'sticky',
    bottom: 0
  }

  function getHeadVal () {
    return Object.values(categoriaHeaders)
  }

  function getHeadKeys () {
    return Object.keys(categoriaHeaders)
  }

  function CreatePaq () {
    return (
      <div className="p-4" style={stickStyle}>
        <Button variant='contained' startIcon={<Add />} sx={{ padding: '10px', paddingLeft: '20px', fontSize: '45px', boxShadow: 3, borderRadius: '20px', backgroundColor: 'blue' }} onClick={() => setModalNew(true)} />

        <CreateOneCat row={rows[0]} headers={getHeadKeys()} instance={server} labels={getHeadVal()} setRows={setRows} setModalPre={setModalPre} setModalPretext={setModalPretext} setModalNew={setModalNew} modalNew={modalNew} />

      </div>
    )
  }

  return (
    <>

    <section id="categorias" className="p-2 mb-56" >
      <div className="flex flex-row items-center ml-20" >
        <h1 className="mr-2 font-bold text-xl" >Categorias</h1>
        <div style={{ width: '155px', height: '1px', border: '1px solid rgb(75 85 99)', marginTop: '2px' }}></div>
      </div>

      <div className="ml-10 mt-8 shadow-lg shadow-gray-700 grid grid-cols-4 relative" style={{ maxWidth: '90%' }}>
        {
            rows !== undefined
              ? rows.map((row, i) => <Categories category={row} isAdmin={isAdmin} server={server} setModalPre={setModalPre} setModalPretext={setModalPretext} setRows={setRows} getHeadKeys={getHeadKeys} getHeadVal={getHeadVal} />)
              : <></>
        }
      </div>

      <div>
        {
          rows !== undefined && isAdmin
            ? <CreatePaq />
            : <></>
        }
        <ModalPer opn={modalPre} text={modalPreText} />
      </div>

    </section>

    </>
  )
}

export default SectionCat
