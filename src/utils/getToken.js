export default async function getToken ({ config, tokenId, refresher, header, getTokenType }) {
  if (!localStorage.getItem(tokenId)) {
    const token = await refresher()
    config.headers.Authorization = getTokenType(token)

    return config
  }

  const token = localStorage.getItem(tokenId)

  config.headers[header] = getTokenType(token)

  return config
}
