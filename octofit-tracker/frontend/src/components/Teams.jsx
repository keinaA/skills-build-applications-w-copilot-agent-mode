import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

async function loadTeams(signal) {
  const response = await fetch(`${API_BASE_URL}/api/teams/`, { signal })
  return readCollectionResponse(response)
}

function Teams() {
  const { records, isLoading, error } = useCollection(loadTeams)

  return (
    <CollectionPage
      title="Teams"
      description="Find your crew, cheer each other on, and build healthy habits together."
      records={records}
      isLoading={isLoading}
      error={error}
      renderRecord={(team) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <h2 className="h5 mb-0">{team.name}</h2>
            <span className="badge text-bg-success">{team.points} points</span>
          </div>
          <p className="text-secondary">{team.description}</p>
          <p className="small mb-0">
            {team.members?.length ?? 0} {team.members?.length === 1 ? 'member' : 'members'}
          </p>
        </>
      )}
    />
  )
}

export default Teams
