const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function readCollectionResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  return extractRecords(payload)
}

function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data']) {
      const value = payload[key]
      if (Array.isArray(value)) {
        return value
      }
      if (key === 'data' && value && typeof value === 'object') {
        return extractRecords(value)
      }
    }
  }

  throw new Error('API response must be an array or a paginated collection.')
}
