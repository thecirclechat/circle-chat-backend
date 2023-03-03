//import React from 'react'
import styles from './style'
// import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero, Login, Home } from "./components";
<<<<<<< HEAD
import { Navbar, Footer, Home, Login, Register } from './components';
=======
import { Navbar, Footer, Home, Login } from './components';
import axios from 'axios'
>>>>>>> ae62db4569d5f3dc5d9f8ad85833f3878c66c52d
import { BrowserRouter, Route, Link, NavLink, Routes} from "react-router-dom";



const App = () => {
  axios.get("http://localhost:3000/api").then(res => {
  console.log(res.data)
})
//   axios.post("http://localhost:3000/api", {
//     "username": "testing",
//     "password": 1234567890
// }).then(res => {
//   console.log(res.data)
// })
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
