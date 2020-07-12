import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import './NavBar1.css'
import OrangeBtn from './OrangeBtn'
import {AuthAgentInfos} from '../../AuthAgentInfos'

function NavBar1() {

     return (
        <div className="navbar1-container">

       <nav className="navbar navbar-expand-lg navbar-light ">
       <div className="navbar-brand" ><span id="e-letter">E</span>-BANK <span id="agent">Agent</span></div>


      </nav>

        </div>
    )
}

export default NavBar1
