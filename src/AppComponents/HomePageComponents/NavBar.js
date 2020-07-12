import React from 'react'
import {Link} from 'react-router-dom'
import OrangeBtn from "./OrangeBtn"
import "./NavBar.css"
function NavBar() {
    return (
        <div className="parent-container">
        <nav className="navbar navbar-expand-lg navbar-light ">
  <Link className="navbar-brand" to="/"><span id="e-letter">E</span>-BANK</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      
      <li className="nav-item">
        <Link className="nav-link" to="/">Acceuil</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/guide">Guide</Link>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link " to="/contact">Contact</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/authentification"> <OrangeBtn text="S'authentifier" /> </Link>
      </li>            
      
    </ul>
  </div>
</nav>
           
        </div>
    )
}

export default NavBar
