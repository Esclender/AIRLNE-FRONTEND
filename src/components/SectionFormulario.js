import FormularioInfo from './InfoCenter/Form'
import InfoTable from './InfoCenter/InfoTable'

const SecctionForm = ({ id, title }) => {
  const isAdmin = process.env.REACT_APP_ROL.trim() === 'ADMIN'

  const infoRoutes = {
    get: '/infoCenter/claims',
    put: '/infoCenter',
    delete: '/infoCenter',
    post: '/infoCenter'
  }

  const infoRoutesTable = {
    get: '/infoCenter',
    put: '/infoCenter',
    delete: '/infoCenter',
    post: '/infoCenter'
  }

  return (
    <section id={id} className="p-2 mb-56" >
      <div className="flex flex-row items-center ml-20" >
        <h1 className="mr-2 font-bold text-xl" >{title}</h1>
        <div style={{ width: '155px', height: '1px', border: '1px solid rgb(75 85 99)', marginTop: '2px' }}></div>
      </div>

      <div className="flex flex-row" >
        <FormularioInfo routes={infoRoutes} />
        <InfoTable routes={infoRoutesTable} isAdmin={isAdmin} />
      </div>

    </section>
  )
}

export default SecctionForm
