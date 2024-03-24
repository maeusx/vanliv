import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

export default function AuthRequired() {
  const auth = getAuth()
  const user = auth.currentUser
  const location = useLocation()

  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (!user) {
    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <Navigate
        to="/login"
        state={{
          message: 'You must sign in first',
          from: location.pathname,
        }}
        replace
      />
    )
  }
  return <Outlet />
}
