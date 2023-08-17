import createClientToken from './createClientToken'

export default async function refreshCLientToken () {
  const token = await createClientToken()

  localStorage.setItem('tokenClient', JSON.stringify({ token, expirationTime: Date.now() }))

  return token
}
