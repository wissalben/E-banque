import React from 'react'
import icon1 from './Images/icon-securite2.PNG'
import icon2 from './Images/icon-data2.PNG'
import icon3 from './Images/icon-simplicite2.PNG'
import './Priorites.css'
function Priorites() {
    return (
        <div className="priorites-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                    <div className="card card-cont" >
                           <div className="card-body">
                             <h2 className="card-title">Sécurité</h2>
                             <div className="img-cont"><img className="img-fluid" src={icon1}/></div><br/>
                             <h5 className="card-text"> Toutes vos opérations sur l'application sont protégées , et sécurisées .</h5>
                           </div>
                         </div>
                        </div>

                        <div className="col-md-4">
                    <div className="card card-cont" >
                           <div className="card-body">
                             <h2 className="card-title">Vos données</h2>
                             <div className="img-cont"><img className="img-fluid" src={icon2}/></div><br/>
                             <h5 className="card-text"> vos données sont bien protégées en respectant les normes de privatisation des données</h5>
                           </div>
                         </div>
                        </div>

                    <div className="col-md-4">
                    <div className="card card-cont" >
                           <div className="card-body">
                             <h2 className="card-title">Simplicité</h2>
                             <div className="img-cont"><img className="img-fluid" src={icon3}/></div><br/>
                             <h5 className="card-text"> Faites vos opérations bancaires en des simples cliques , et de n'importe ou .</h5>
                           </div>
                         </div>
                        </div>                                                
                    </div>
                </div>
                <br/> <br/><br/><br/><br/><br/><br/><br/>
            </div>
            
        
    )
}

export default Priorites
