import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

async function loadWorkouts(signal) {
  const response = await fetch(`${API_BASE_URL}/api/workouts/`, { signal })
  return readCollectionResponse(response)
}

function Workouts() {
  const { records, isLoading, error } = useCollection(loadWorkouts)

  return (
    <CollectionPage
      title="Workouts"
      description="Discover approachable workout ideas matched to different interests and fitness levels."
      records={records}
      isLoading={isLoading}
      error={error}
      renderRecord={(workout) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <h2 className="h5 mb-0">{workout.title}</h2>
            <span className="badge text-bg-light text-capitalize">{workout.difficulty}</span>
          </div>
          <p className="text-secondary">{workout.description}</p>
          <p className="small mb-1 text-capitalize">{workout.activityType}</p>
          <p className="small text-secondary mb-0">
            {workout.durationMinutes} minutes · {workout.recommendedFor?.length ?? 0} recommended
          </p>
        </>
      )}
    />
  )
}

export default Workouts
