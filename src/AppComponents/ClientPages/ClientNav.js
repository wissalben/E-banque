import React from 'react'
import {Link} from 'react-router-dom'
import OrangeBtn from "../HomePageComponents/OrangeBtn"
import "./ClientNav.css"
import {AuthUserInfos} from '../../AuthUserInfos'
function ClientNav() {
  const {user, dispatch} =React.useContext(AuthUserInfos) ;
  const linkToInfoPage = "/client/"+user.userInformations.numeroClient+"/infos" ;
  const linkToClientAcceuil ="/client/"+user.userInformations.numeroClient ;
  const handleDispatch = () => {
    dispatch({type:'userSignedOut'})
  }
    return (
        <div className="parent-container">
        <nav className="navbar navbar-expand-lg navbar-light ">
  <Link className="navbar-brand" to={linkToClientAcceuil}><span id="e-letter">E</span>-BANK</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item">
        <Link className="nav-link" to={linkToClientAcceuil} >Acceuil</Link>
      </li>


      <li className="nav-item">
        <Link className="nav-link" to={linkToInfoPage} >Mes Informations</Link>
      </li>
      

      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={handleDispatch}> <OrangeBtn text="se deconnecter" /> </Link>
      </li>            
      
    </ul>
  </div>
</nav>
           
        </div>
    )
}

export default ClientNav
