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

export default function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(`${apiBaseUrl}/users/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setUsers(normalizeCollection(payload))
          setStatus('success')
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-3">Users</h1>
      <p className="text-muted small">Source: {apiBaseUrl}/users/</p>

      {status === 'loading' && <p>Loading users...</p>}
      {status === 'error' && <div className="alert alert-danger">Failed to load users: {errorMessage}</div>}

      {status === 'success' && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.name ?? 'N/A'}</td>
                  <td>{user.email ?? 'N/A'}</td>
                  <td>{user.fitnessLevel ?? user.level ?? 'N/A'}</td>
                  <td>{user.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p>No users found.</p>}
        </div>
      )}
    </section>
  )
}
