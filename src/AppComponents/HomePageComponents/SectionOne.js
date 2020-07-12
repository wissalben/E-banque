import React from 'react'
import {Link} from 'react-router-dom'
import OrangeBtn from "./OrangeBtn"
import transfer from "./Images/transfer.png"
import './SectionOne.css'
function SectionOne() {
    return (
        <div className="container-fluid section-one-container">
            <div className="row ">
                <div className="col-md-6 section-one-col1 ">
                    <p className="p-text">ACCES</p>
                    <p className="p-text">RAPIDE, SECURISE</p>
                    <p className="p-text">ET SANS SE DEPLACER</p>
                    <br/>
                   <Link to="/authentification"> <OrangeBtn text="Commencer"/> </Link><br/>
                </div>
                <div className="image-container col-md-6  section-one-col2 ">
                 <img src={transfer} className="container-fluid" />
                </div>
            </div>

            
        </div>
    )
}

export default SectionOne
