import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import LatestCollection from '../components/LatestCollection.jsx'

const home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
    </div>
  )
}

export default home