import ApiConnection from '../../Server.js'

import { Card, Typography } from '@material-tailwind/react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../features/Tables/tableSlice.js'
import { Delete } from './Delete.js'

export default function InfoTable ({ routes, isAdmin }) {
  const server = new ApiConnection(routes)
  const TABLE_ROWS = useSelector(state => state.infoRows)
  const dispatch = useDispatch()

  useEffect(() => {
    server.route.get = '/infoCenter'
    server.getAllData()
      .then(data => {
        dispatch(setInfo(data))
      })
  }, [routes])

  return (
    <>
    <Card className="mt-8 ml-8 h-full w-1/2 shadow-lg shadow-gray-700" style={{ overflowY: 'scroll', maxHeight: '750px' }}>
      <table className="w-full min-w-max table-auto text-left">
        <tbody>
          {
            TABLE_ROWS !== undefined
              ? TABLE_ROWS.map((claim) => {
                const { userData, claimType, createdAt, comment } = claim

                const classes = 'p-4'
                return (
                  <>
                  <tr key={userData.name}>

                    <td className={classes}>
                      <Typography variant="h2" color="blue-gray" className="font-normal">
                        {userData.name}
                      </Typography>

                      <div className="flex flex-row">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {claimType}
                        </Typography>

                        <Typography variant="small" color="blue-gray" className="ml-2 font-bold">
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>

                        <Typography variant="small" color="blue-gray" className="ml-2 font-bold">
                          {userData.prefix}{userData.contactNum}
                        </Typography>
                      </div>

                      <Typography variant="small" color="blue-gray" className="font-normal">
                          Comentario: {comment}
                      </Typography>
                    </td>

                    {
                      isAdmin
                        ? <Delete row={claim} instance={server} />
                        : <></>
                    }
                  </tr>
                  </>
                )
              })
              : <></>
          }
        </tbody>
      </table>
    </Card>

    </>
  )
}
