//import React from 'react'
import styles from './style'
// import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero, Login, Home } from "./components";
import { Navbar, Footer, Home, Login, Register } from './components';
import { BrowserRouter, Route, Link, NavLink, Routes} from "react-router-dom";



const App = () => {
  return (
    <div className='bg-primary w-full overflow-hidden'>
     <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
     </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />

  </Routes>
     <Footer />
  </div>
  )
}

export default App
