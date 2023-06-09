import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Coins from './components/Coins' 
import CoinDetails from './components/CoinDetails'
import Exchanges from './components/Exchanges'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/coins' element={<Coins />} />
                <Route exact path='/exchanges' element={<Exchanges />} />
                <Route  path='/coin/:id' element={<CoinDetails />} />
            </Routes>
            <Footer />
        </Router>
    </>
  )
}

export default App