import React from 'react'
import Title from './Title'
import './CommentMarche.css'
function CommentMarche() {
    return (
        <div className="comment-marche-container">
        <Title text="Comment ça marche ?" />
        <div className="container">
        <div className="row">
            <div className="col-md-12 marche-text-container">
                <p className="marche-text">- Si vous etes un client de la banque E-BANK , il suffit juste de cliquez sur le bouton s'authentifier et puis remplir le formulaire d'authentification, ca ne prendra que quelque minute de votre temps . </p>
                <p className="marche-text">-Une fois l'étape ci-dessus est terminée , vous allez accéder a votre espace , et faire vos opérations en toute sécurité et en des simples cliques . </p>
                <p className="marche-text">-Si vous n'etes pas un client de la banque E-BANK , c'est la bonne occasion pour nous rejoindre et de bénéficer de nos services qui vont  vous faciliter la vie , visitez alors l'agence E-BANK la plus proche de vous .</p>
            </div>
        </div>
        </div>            
        </div>
    )
}

export default CommentMarche
