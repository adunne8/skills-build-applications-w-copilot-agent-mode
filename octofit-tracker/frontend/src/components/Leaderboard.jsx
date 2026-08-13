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

function getUserLabel(entry) {
  if (entry?.user?.name) {
    return entry.user.name
  }

  if (entry?.user?.email) {
    return entry.user.email
  }

  if (typeof entry?.user === 'string') {
    return entry.user
  }

  return 'N/A'
}

export default function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setEntries(normalizeCollection(payload))
          setStatus('success')
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-3">Leaderboard</h1>
      <p className="text-muted small">Source: {apiBaseUrl}/leaderboard/</p>

      {status === 'loading' && <p>Loading leaderboard...</p>}
      {status === 'error' && <div className="alert alert-danger">Failed to load leaderboard: {errorMessage}</div>}

      {status === 'success' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id ?? entry.id ?? `${entry.user}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{getUserLabel(entry)}</td>
                  <td>{entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && <p>No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  )
}
