import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import './NavBar2.css'
import OrangeBtn from './OrangeBtn'
import {AuthAgentInfos} from '../../AuthAgentInfos'

function NavBar2() {
   
    const {agent, dispatch} = useContext(AuthAgentInfos)
    const [visible, setVisible] = React.useState(true)
    console.log("eeeeeee" ,agent)
    const handleSignedOut = () => {
       
            dispatch({type:'agentSignedOut'}) 
            setVisible(false)

    }

     return (
        <div className="navbar1-container">

            
       <nav className="navbar navbar-expand-lg navbar-light ">
       <div className="navbar-brand" ><span id="e-letter">E</span>-BANK <span id="agent">Agent</span></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"  onClick={handleSignedOut}><OrangeBtn text="se deconnecter"/> </Link>
            </li>            
      
          </ul>
        </div>
      </nav>

        </div>
    )
}

export default NavBar2
