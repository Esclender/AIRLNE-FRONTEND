import axios from 'axios'

export default async function createClientToken ({ username, password }) {
  const token = localStorage.getItem('token')
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/regularClient/login`, {
    username,
    password
  }, {
    headers: { Authorization: token }
  })
  return data.token
}
