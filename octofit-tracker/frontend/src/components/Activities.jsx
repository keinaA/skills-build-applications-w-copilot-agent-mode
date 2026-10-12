import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

async function loadActivities(signal) {
  const response = await fetch(`${API_BASE_URL}/api/activities/`, { signal })
  return readCollectionResponse(response)
}

function Activities() {
  const { records, isLoading, error } = useCollection(loadActivities)

  return (
    <CollectionPage
      title="Activities"
      description="Every session adds up. See the latest movement from the OctoFit community."
      records={records}
      isLoading={isLoading}
      error={error}
      renderRecord={(activity) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <h2 className="h5 mb-0 text-capitalize">{activity.type}</h2>
            <span className="badge text-bg-success">{activity.points} points</span>
          </div>
          <p className="mb-2">{activity.user?.name || 'OctoFit member'}</p>
          <p className="small text-secondary mb-1">{activity.durationMinutes} minutes</p>
          {activity.distanceKm != null && (
            <p className="small text-secondary mb-1">{activity.distanceKm} km</p>
          )}
          {activity.calories != null && (
            <p className="small text-secondary mb-0">{activity.calories} calories</p>
          )}
        </>
      )}
    />
  )
}

export default Activities
