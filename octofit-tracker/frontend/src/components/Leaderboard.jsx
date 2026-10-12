import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

async function loadLeaderboard(signal) {
  const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal })
  return readCollectionResponse(response)
}

function Leaderboard() {
  const { records, isLoading, error } = useCollection(loadLeaderboard)

  return (
    <CollectionPage
      title="Leaderboard"
      description="Recognize the consistency, effort, and teamwork earning points this month."
      records={records}
      isLoading={isLoading}
      error={error}
      renderRecord={(entry) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <h2 className="h5 mb-0">{entry.user?.name || 'OctoFit member'}</h2>
            <span className="badge text-bg-primary">#{entry.rank}</span>
          </div>
          <p className="mb-2">{entry.team?.name || 'Independent athlete'}</p>
          <p className="small text-secondary mb-0">
            {entry.points} points · {entry.period}
          </p>
        </>
      )}
    />
  )
}

export default Leaderboard
