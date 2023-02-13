import {useState} from 'react'
import { close, logo, menu } from '../assets';
import Login from './Login';
import App from '../App';
import Home from './Home';
// import { navLinks } from '../constants';
import { BrowserRouter, Route, Link, NavLink} from "react-router-dom";


const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    // <Router>
    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* <Routes> */}
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />
      <div className="list-none sm:flex hidden justify-evenly items-center flex-1">
        {/* <NavLink className="testing" to="/" >Hello</NavLink> */}
        <Link style={{ textDecoration: 'none'}} to="/">

      <ul className={`font-poppins font-normal cursor-pointer text-[16px] ${
        active ? "text-white" : "text-dimWhite"
      }`}
      onClick={() => setActive(nav.title)}>Home</ul>
      </Link>
      <Link style={{ textDecoration: 'none'}} to='/Login'>

      <ul className={`font-poppins font-normal cursor-pointer text-[16px] ${
        active ? "text-white" : "text-dimWhite"
      }`}
      onClick={() => setActive(nav.title)}>
          Login
        </ul>
            </Link>
      <ul className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active ? "text-white" : "text-dimWhite"
          }`}
          onClick={() => setActive(nav.title)}>Pricing</ul>
      <ul className={`font-poppins font-normal cursor-pointer text-[16px] ${
            active ? "text-white" : "text-dimWhite"
          }`}
          onClick={() => setActive(nav.title)}>Update</ul>
      </div>
  </nav>
  );
}

export default Navbar