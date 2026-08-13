import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">OctoFit Tracker</a>
          </div>
        </nav>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your activities, compete with teammates, and improve your fitness</p>
    </div>
  )
}

export default App
