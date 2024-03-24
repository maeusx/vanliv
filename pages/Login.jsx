import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { authSignOut } from '/src/firebase.js'

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [error, setError] = React.useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  const host = location.state?.from || '/host'
  const home = location.state?.home || '/'

  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        setError(null)
        navigate(host, { replace: true })
      })
      .catch((err) => {
        setError(err)
      })
  }

  function logOut() {
    authSignOut()
      .then(() => {
        navigate(home, { replace: true })
      })
      .catch((err) => {
        setError(err)
      })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  })

  return !isLoggedIn ? (
    <div className="login-container">
      {location.state?.message && <h3 className="login-error">{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      {error?.message && <h3 className="login-error">{error.message}</h3>}
      <button className="google-button" onClick={signInWithGoogle}>
        <img src="/google.png" />
      </button>
    </div>
  ) : (
    <div className="login-container">
      <h1>Sign out from your account</h1>
      <button className="logout-button" onClick={logOut}>
        Sign out
      </button>
    </div>
  )
}
