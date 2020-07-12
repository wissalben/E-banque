import React from 'react'
import './ErrorPage.css'
function ErrorPage() {
    React.useEffect(() => {
        document.title = 'Erreur'
        
      })
    return (
        <div id="error-page-conatainer" className="container">
            Erreur : Page introuvable
        </div>
    )
}

export default ErrorPage
