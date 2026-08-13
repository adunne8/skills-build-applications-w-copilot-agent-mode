import { useEffect, useState } from 'react'

const CODESPACES_ENDPOINT_PATTERN = 'https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams'

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

function getMemberNames(team) {
  if (!Array.isArray(team?.members)) {
    return 'No members'
  }

  const names = team.members
    .map((member) => {
      if (typeof member === 'string') {
        return member
      }

      return member?.name ?? member?.email ?? null
    })
    .filter(Boolean)

  return names.length > 0 ? names.join(', ') : 'No members'
}

export default function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setTeams(normalizeCollection(payload))
          setStatus('success')
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-3">Teams</h1>
      <p className="text-muted small">Source: {apiBaseUrl}/teams/</p>

      {status === 'loading' && <p>Loading teams...</p>}
      {status === 'error' && <div className="alert alert-danger">Failed to load teams: {errorMessage}</div>}

      {status === 'success' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Team</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.id ?? team.name}>
                  <td>{team.name ?? 'N/A'}</td>
                  <td>{getMemberNames(team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {teams.length === 0 && <p>No teams found.</p>}
        </div>
      )}
    </section>
  )
}
