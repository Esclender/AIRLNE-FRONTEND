import axios from 'axios'

export default async function createToken () {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
    email: 'elesclenderlugo@gmail.com',
    password: '12345M'
  })
  return data.token
}
