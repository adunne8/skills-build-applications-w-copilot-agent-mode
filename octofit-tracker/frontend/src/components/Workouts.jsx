import { useEffect, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function getUserLabel(workout) {
  if (workout?.user?.name) {
    return workout.user.name
  }

  if (workout?.user?.email) {
    return workout.user.email
  }

  if (typeof workout?.user === 'string') {
    return workout.user
  }

  return 'N/A'
}

function getExercisesLabel(workout) {
  if (!Array.isArray(workout?.exercises) || workout.exercises.length === 0) {
    return 'No exercises listed'
  }

  return workout.exercises.join(', ')
}

export default function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setWorkouts(normalizeCollection(payload))
          setStatus('success')
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-3">Workouts</h1>
      <p className="text-muted small">Source: {apiBaseUrl}/workouts/</p>

      {status === 'loading' && <p>Loading workouts...</p>}
      {status === 'error' && <div className="alert alert-danger">Failed to load workouts: {errorMessage}</div>}

      {status === 'success' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>User</th>
                <th>Difficulty</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout._id ?? workout.id ?? `${workout.title}-${index}`}>
                  <td>{workout.title ?? 'N/A'}</td>
                  <td>{getUserLabel(workout)}</td>
                  <td>{workout.difficulty ?? 'N/A'}</td>
                  <td>{getExercisesLabel(workout)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {workouts.length === 0 && <p>No workouts found.</p>}
        </div>
      )}
    </section>
  )
}
