import createToken from './createToken'

export default async function refreshToken () {
  const token = await createToken()

  localStorage.setItem('token', JSON.stringify({ token, expirationTime: Date.now() }))

  return token
}
