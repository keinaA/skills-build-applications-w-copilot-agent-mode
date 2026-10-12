import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

async function loadUsers(signal) {
  const response = await fetch(`${API_BASE_URL}/api/users/`, { signal })
  return readCollectionResponse(response)
}

function Users() {
  const { records, isLoading, error } = useCollection(loadUsers)

  return (
    <CollectionPage
      title="Users"
      description="Meet the people building stronger routines across the OctoFit community."
      records={records}
      isLoading={isLoading}
      error={error}
      renderRecord={(user) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <h2 className="h5 mb-0">{user.name}</h2>
            <span className="badge text-bg-light text-capitalize">{user.fitnessLevel}</span>
          </div>
          <p className="small text-secondary mb-2">@{user.username}</p>
          <p className="mb-2">{user.email}</p>
          <p className="small text-secondary mb-0">
            {user.team?.name || 'No team yet'}{user.age ? ` · Age ${user.age}` : ''}
          </p>
        </>
      )}
    />
  )
}

export default Users
