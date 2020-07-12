import React from 'react'
import Title from './HomePageComponents/Title'
import './Guide.css'
function Guide() {
  React.useEffect(() => {
    document.title = 'Guide'
    
  })
    return (
        <div className="guide-container">
          <Title text="Guide d'utilisation" /><br/><br/>
           <div className="container guide-text-container">
            <p className="guide-text">- Veuillez rejoindre l'agence E-BANK la proche de vous .</p>
            <p className="guide-text">- Contacter votre agent , il va vous donner un pseudo et un mot de passe que vous devrez retenir .</p>
            <p className="guide-text">- Passez à la page d'authentification ,  remplissez le formulaire avec les données fournies par votre agent.</p>
            <p className="guide-text">- Après que vous allez réussir l'étape d'authentification vous aurez la possibilité d'accéder à votre compte et faire vos opérations bancaires.</p>
            
          </div>  
               
        </div>
    )
}

export default Guide
