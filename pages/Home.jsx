import React from 'react'
import { Link } from 'react-router-dom'
import bgImg from '/home-hero.jpg'

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <img src={bgImg} className="home-hero-image" />
      </div>
      <p className="subtitle">
        liv <i>(noun)</i>: Scandinavian word meaning "life".
      </p>
      <h1>You've got the travel plans, we've got the travel vans.</h1>
      <p>Rent the perfect van for your perfect road trip.</p>
      <Link to="vans">Explore our vans</Link>
    </div>
  )
}
