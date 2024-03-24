import React from 'react'
import { Link } from 'react-router-dom'
import { getHostVans, deleteDocument } from '/src/firebase.js'

export default function HostVans() {
  const [vans, setVans] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function loadVans() {
      try {
        const data = await getHostVans()
        setVans(data)
      } catch (err) {
        setError(err)
      }
    }
    loadVans()
  }, [])

  function deleteVan(van) {
    deleteDocument(van)
    location.reload()
  }

  const hostVansEls = vans.map((van) => (
    <div className="host-van-single" key={van.id}>
      <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
      <div className="host-van-info">
        <h3>{van.name}</h3>
        <p>${van.price}/day</p>
      </div>
      <Link className="delete-button" to={van.id} key={van.id}>
        View
      </Link>
      <a className="delete-button" onClick={() => deleteVan(van.id)}>
        Delete
      </a>
    </div>
  ))

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <section>
      <div className="host-vans-title">
        <h1>Your listed vans</h1>
        <Link className="new-van" to="../new">
          Add new
        </Link>
      </div>
      <div className="host-vans-list">
        {vans.length > 0 ? <section>{hostVansEls}</section> : <h2>No vans yet...</h2>}
      </div>
    </section>
  )
}
