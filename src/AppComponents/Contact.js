import React from 'react'
import Title from './HomePageComponents/Title'
import './Contact.css'
function Contact() {
  React.useEffect(() => {
    document.title = 'Contactez-nous'
    
  })
    return (
        <div className="contact-container">
          <Title text="Contact" /><br/><br/>
           <div className="container contact-text-container">
            <p className="contact-text">-Contactez-nous sur : 05 24 51 45 52 - 05 24 78 96 02</p>
            <p className="contact-text">- Notre adresse gmail : ebank@gmail.com</p>
            <p className="contact-text">- Notre page sur Facebook : E-BANK</p>
            <p className="contact-text">- Ou bien visitez l'agence la plus proche de vous ! Nous serons très heureux de vous acceuillir.</p>
            <p className="contact-text">- Adresse du siège  E-BANK : Avenue Allal el fassi en face Lycee Qady Ayyad Marrakech</p>
          </div>  
               
        </div>
    )
}

export default Contact
