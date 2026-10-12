import { useEffect, useState } from 'react'

export default function useCollection(loadCollection) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    loadCollection(controller.signal)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError?.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [loadCollection])

  return { records, isLoading, error }
}
