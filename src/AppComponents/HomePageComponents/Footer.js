import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <div className="footer-container">
            <div className="footercont"> 
            <p id="contacter-nous">Contactez-nous</p>
            <div className="row ">
                <div className="col-md-4">
                <p><i className="fa fa-map-marker" aria-hidden="true"> </i> Avenue Allal el fassi en face Lycee Qady Ayyad Marrakech </p>
                </div>

                <div className="col-md-4">
                <p><i className="fa fa-phone" aria-hidden="true"></i> 05 24 51 45 52</p>
                <p><i className="fa fa-phone" aria-hidden="true"></i> 05 24 78 96 02</p>
                </div>

                <div className="col-md-4">
                <p><i className="fa fa-envelope" aria-hidden="true"></i> ebank@gmail.com</p>
                <p><i className="fa fa-facebook" aria-hidden="true"></i> E-BANK </p>
                </div>

                </div>
            </div>
            
        </div>
    )
}

export default Footer
