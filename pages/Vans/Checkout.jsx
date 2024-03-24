import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVan } from '/src/firebase.js'

export default function Checkout() {
  const [van, setVan] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { id } = useParams()

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true)
      try {
        const data = await getVan(id)
        setVan(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadVans()
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className="van-detail-container">
      <Link to={'/vans'} className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      {van && (
        <div className="van-checkout">
          <h2>You are about to rent this van:</h2>
          <img src={van.imageUrl} />
          <h1>{van.name}</h1>
          <h2>
            <span>${van.price}</span>/day
          </h2>
          <hr />
          <p>Please fill out the following information:</p>
          <form className="login-form checkout-form">
            <p>Driver's full name</p>
            <input type="text" placeholder="Jane Doe" />
            <p>Number of passengers</p>
            <select>
              <option>1 - 2</option>
              <option>3 - 4</option>
              <option>5 +</option>
            </select>
            <div className="flex-form">
              <p>Pickup</p>
              <input type="date" value="2024-03-20" min="2024-03-01" max="2024-12-31" />
              <p>Return</p>
              <input type="date" value="2024-03-22" min="2024-03-01" max="2024-12-31" />
            </div>
            <p>Credit Card Number</p>
            <input type="number" maxLength="16" placeholder="1234 5678 9000 0000" />
            <p>CVV</p>
            <input type="number" maxLength="3" placeholder="123" />
            <div className="checkbox">
              <input type="checkbox" id="insurance" name="insurance" />
              <label for="insurance">Add collision damage waiver and accident insurance to my van for $9/day.</label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="terms" name="terms" />
              <label for="terms">
                By checking this box you agree to our <u>terms and conditions</u>.
              </label>
            </div>
          </form>
          <button className="checkout-button">Complete Payment</button>
        </div>
      )}
    </div>
  )
}
