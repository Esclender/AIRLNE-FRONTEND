import { Button as Btn } from '@material-tailwind/react'

function AdminBtnsPaq ({ stUp, setDlt }) {
  return (
    <>
      <div className="flex flex-row p-4" >
          <Btn className='p-2
            font-[Roboto Mono]
            rounded-2xl bg-blue-500 mr-2 font-thin
            hover:bg-white hover:text-hero'
          onClick={() => stUp(true)}>
              Update
          </Btn>

          <Btn className='p-2
            font-[Roboto Mono]
            rounded-2xl bg-red-500 font-thin
            hover:bg-white hover:text-hero'
            onClick={() => setDlt(true)}>
            Delete
          </Btn>
        </div>
    </>
  )
}

export default AdminBtnsPaq
