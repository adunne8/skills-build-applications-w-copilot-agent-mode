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

function getUserLabel(activity) {
  if (activity?.user?.name) {
    return activity.user.name
  }

  if (activity?.user?.email) {
    return activity.user.email
  }

  if (typeof activity?.user === 'string') {
    return activity.user
  }

  return 'N/A'
}

export default function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(`${apiBaseUrl}/activities/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setActivities(normalizeCollection(payload))
          setStatus('success')
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-3">Activities</h1>
      <p className="text-muted small">Source: {apiBaseUrl}/activities/</p>

      {status === 'loading' && <p>Loading activities...</p>}
      {status === 'error' && <div className="alert alert-danger">Failed to load activities: {errorMessage}</div>}

      {status === 'success' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? activity.id ?? `${activity.type}-${activity.performedAt}`}>
                  <td>{getUserLabel(activity)}</td>
                  <td>{activity.type ?? 'N/A'}</td>
                  <td>{activity.durationMinutes ?? activity.duration ?? 'N/A'}</td>
                  <td>{activity.caloriesBurned ?? activity.calories ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && <p>No activities found.</p>}
        </div>
      )}
    </section>
  )
}
