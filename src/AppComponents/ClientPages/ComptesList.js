import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import iconCc from '../images/icon-compteCheque.PNG'
import iconCe from '../images/icon-compteEpargne.PNG'
import './ComptesList.css'
import {AuthUserInfos} from '../../AuthUserInfos'
function ComptesList(props) {
    const {user,dispatch} = React.useContext(AuthUserInfos);
   const tailleList = props.comptesInfos.length ;

   if(tailleList == 0)  {return (<div> <h4 className="text-center mx-auto">Vous n'avez pas encore de compte, veuillez consulter votre agent!</h4><br/><br/><br/></div>)}
   
   //console.log('comptes infos is : ',props.comptesInfos)
   const list = !tailleList ? " ... Loading" : props.comptesInfos.map((element,index) => {
    //let linkCompte ="/client/:"+user.userInformations.numeroClient+"/compte/:"+element.codeCompte;
    let linkCompte =`/client/${user.userInformations.numeroClient}/compte/${element.codeCompte}`;  
       if(element.actif) {
       return (
           <div key={index} className="col-md-5 comptes">

               <div className="card cont-card text-center" >
                           <div className="card-body body-card">
                             <h2 className="card-title title-card">{element.hasOwnProperty('decouvert')?`Compte Courant ${index+1}`:`Compte Epargne ${index+1}`}</h2>
                             <div className="img-cont"><img className="img-fluid" src={element.hasOwnProperty('decouvert')? iconCc:iconCe}/></div><br/>
                             <Link to={linkCompte}><div className="card-text acceder-btn">Acceder</div></Link>
                           </div>
                         </div>
               
           </div>
       ) } else  {
              return(
                      <div key={index} className="col-md-5 comptes">
                      <div className="card cont-card text-center" >
                           <div className="card-body body-card">
                             <h2 className="card-title title-card">{element.hasOwnProperty('decouvert')?`Compte Courant ${index+1}`:`Compte Epargne ${index+1}`}</h2>
                             <div className="img-cont"><img className="img-fluid" src={element.hasOwnProperty('decouvert')? iconCc:iconCe}/></div><br/>
                              <div className="compte-non-actif">Ce compte n'est pas actif</div>
                              <div className="compte-non-actif">Veuillez regler vos problemes.</div>
                             
                           </div>
                         </div>

</div>

               ) }
  
   }) ;
    return (
        <div className="comptes-list-container container ml-2">
            <div className="row">
         {
             list
         }
         </div>
        </div>
    )
}

export default ComptesList
