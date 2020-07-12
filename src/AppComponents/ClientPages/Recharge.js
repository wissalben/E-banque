import React,{useContext,useState}from 'react'
import Title from '../HomePageComponents/Title'
import './Recharge.css'
import {AuthUserInfos} from '../../AuthUserInfos'
import axios from 'axios'
function Recharge(props) {
    const {user,dispatch} = useContext(AuthUserInfos) ; 
    const [numCompte,setNumCompte] = useState(undefined); // numero compte d'utilisateur courant
    const [montant,setMontant] = useState(undefined); // montant de la recharge    
    const [pin,setPin] = useState(undefined); // pin du compte emetteur
    const [error,setError] = useState(false); // erreur dans donnees saisies
    const currentAccountNum = props.match.params.compte_id;
    const currentAccountInfos =  user.comptes.filter((compte) => {
     return compte.codeCompte == props.match.params.compte_id;
      });   // informations of the current account 

      React.useEffect(() => {
        document.title = 'Effectuez Recharge'
        
      })

    const handleChangeNumCompte = (e) => {
        if(e.target.value.toString().length <10) setNumCompte(e.target.value);
    }
    const handleChangePin = (e) => {
        if(e.target.value.toString().length <5) setPin(e.target.value);
    }
    const handleChangeMontant = (e) => {
        if(e.target.value.toString().length <4) setMontant(e.target.value);
    }        
    const handleSubmit = (e) => {
        e.preventDefault() ;
        setError(false)
        console.log("num de compte : ",numCompte) 
        console.log("num de compte : ",montant)
        console.log("num de compte : ",pin)
        console.log("currentAccountInfos are : ", currentAccountInfos)
        
     //exemple: http://localhost:8050/CLIENT/Recharger?numeroClient=3&codeCompte=465800000&montant=40
     //if(pin == currentAccountInfos[0].pin  && currentAccountInfos[0].codeCompte == currentAccountNum && numCompteR.toString().length ==9)
        if( (pin == currentAccountInfos[0].pin)  && (currentAccountInfos[0].codeCompte == numCompte) && (montant.toString().length >= 2) ) {

            console.log(" piin et code compte et montant homa hadok")
            axios.post( 
                `http://localhost:8050/CLIENT/Recharger?numeroClient=${user.userInformations.numeroClient}&codeCompte=${numCompte}&montant=${montant}`,
                {
                    numeroClient:user.userInformations.numeroClient,
                    codeCompte:numCompte,
                    montant:montant
                },
                user.token
              ).then(() => {
                  
                  console.log("la requete post est bien passe") ;
                  document.getElementById('result-recharge-text').innerHTML = 'Recharge avec succes'
                  document.getElementById('result-recharge-text').style.color = 'green'
                  setTimeout(()=>{
                      props.history.push(`/client/${user.userInformations.numeroClient}/compte/${currentAccountNum}`)
                     },3000) 
            })
              .catch(() => {
                  console.log("la requete post a echouee")
                  //setError(true)
                  document.getElementById('result-recharge-text').innerHTML = 'Recharge echoue'
                  document.getElementById('result-recharge-text').style.color = 'red'
                   
              });

    } else {

           console.log('erreur quelque part');
           setError(true)
           document.getElementById('result-recharge-text').innerHTML = 'Recharge echoue'
           document.getElementById('result-recharge-text').style.color = 'red'

    }

    }

    return (
        <div className="recharge-container container">
            <Title text="Effectuez votre recharge"/>
            <div className="erreur text-center">{error? 'Erreur dans les donnees saisies':''}</div>
            <div className="form-recharge-container container text-center">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Votre Num de compte" value={numCompte} onChange={handleChangeNumCompte}/><br/><br/>
                <input type="text" placeholder="Le montant de la recharge" value={montant} onChange={handleChangeMontant}/><br/><br/>
                <input type="password" placeholder="Votre pin" value={pin} onChange={handleChangePin} /><br/><br/>
                <button type="submit" id="submit-recharge-btn">Valider</button>
            </form>
            <div className="resultat-recharge-text" id="result-recharge-text"></div>
            </div>
        </div>
    )
}

export default Recharge
