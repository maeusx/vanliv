import React from 'react'
import { Link } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import { getHostVans } from '/src/firebase.js'
import { getAuth } from 'firebase/auth'

export default function Dashboard() {
  const [vans, setVans] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const auth = getAuth()
  const user = auth.currentUser

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true)
      getHostVans()
        .then((data) => setVans(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }, 500)
  }, [])

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <Link className="delete-button" to={`vans/${van.id}`}>
          View
        </Link>
      </div>
    ))

    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    )
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          {user && <img className="profile-photo" src={user.photoURL} />}
          {user && <h1>Welcome, {user.displayName}!</h1>}
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>

        <BsStarFill className="star" />

        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2 className="left">Your listed vans</h2>
          <Link className="new-van" to="new">
            Add new
          </Link>
        </div>
        {loading && !vans ? <h1>Loading...</h1> : <>{renderVanElements(vans)}</>}
      </section>
    </>
  )
}
