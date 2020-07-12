import React,{useState,useContext,useEffect} from 'react'
import Title from '../HomePageComponents/Title'
import {AuthUserInfos} from '../../AuthUserInfos'
import './Virement.css'
import axios from 'axios'
function Virement(props) {
    const {user, dispatch} = useContext(AuthUserInfos);
    const [numCompteE,setNumCompteE] = useState(undefined); // numero compte emetteur
    const [numCompteR,setNumCompteR] = useState(undefined); // numero compte recepteur
    const [pin,setPin] = useState(undefined); // pin du compte emetteur
    const [montant,setMontant] = useState(undefined);
    const [error,setError] = useState(false); // erreur dans donnees saisies

   //const [virementRes, setVirementRes] = useState(true) ; // resultat du virement , succes ou non
   const currentAccountNum = props.match.params.compte_id;
   const currentAccountInfos =  user.comptes.filter((compte) => {
	return compte.codeCompte == props.match.params.compte_id;
     });   // informations of the current account 
   
     useEffect(() => {
         document.title = 'Effectuez Virement'
         console.log("the user informations is(from Virement Component) :",user)
     } ,[])
 
    const handleChangeNumCompteE = (e) => {
       
       if(e.target.value.toString().length <10) setNumCompteE(e.target.value)
    }
    const handleChangeNumCompteR = (e) => {
        if(e.target.value.toString().length <10) setNumCompteR(e.target.value)
    }   
    const handleChangePin = (e) => {
        if(e.target.value.toString().length <5) setPin(e.target.value)
    }    
    const handleChangeMontant = (e) => {
        setMontant(e.target.value)
    }
    const handleSubmit = (e) => {
        
        e.preventDefault();
        setError(false)
        console.log("compte voulu est de solde : ",currentAccountInfos[0].solde)
        console.log("******les donnees du virement sont :********")
        console.log("*****Num compte courant : ",currentAccountNum)
        console.log("num compte emetteur : ",numCompteE)
        console.log("num compte recepteur : ",numCompteR)
        console.log("le montant : ",montant)
        console.log("le pin est  : ",pin);
        //http://localhost:8050/CLIENT/Virement?codeCompte1=465800000&codeCompte2=465800001&montant=40
        if(pin == currentAccountInfos[0].pin  && currentAccountInfos[0].codeCompte == currentAccountNum && numCompteR.toString().length ==9) {

                console.log(" piin et code compte rec et eme homa hadok")
                axios.post( 
                    `http://localhost:8050/CLIENT/Virement?codeCompte1=${numCompteE}&codeCompte2=${numCompteR}&montant=${montant}`,
                    {
                        codeCompte1:numCompteE,
                        codeCompte2:numCompteR,
                        montant:montant
                    },
                    user.token
                  ).then(() => {
                      console.log("la requete post est bien passe") ;
                      document.getElementById('result-virement-text').innerHTML = 'Virement avec succes'
                      document.getElementById('result-virement-text').style.color = 'green'
                      setTimeout(()=>{
                          props.history.push(`/client/${user.userInformations.numeroClient}/compte/${currentAccountNum}`)
                         },3000) 
                })
                  .catch(() => {
                      console.log("la requete post a echouee")
                      //setError(true)
                      document.getElementById('result-virement-text').innerHTML = 'Virement echoue'
                      document.getElementById('result-virement-text').style.color = 'red'
                       
                  });

        } else {

               console.log('erreur quelque part');
               setError(true)
               document.getElementById('result-virement-text').innerHTML = 'Virement echoue'
               document.getElementById('result-virement-text').style.color = 'red'

        }
        

    } 
    return (
        <div className="virement-container container">
            <Title text="Effectuez votre virement"/>
            <div className="form-virement-container container text-center">
            <div className="erreur">{error? 'Erreur dans les donnees saisies':''}</div>
            <form onSubmit={handleSubmit}>
                
                <input type="number"   placeholder="Votre Num de compte" value={numCompteE} onChange={handleChangeNumCompteE} /><br/><br/>
                <input type="number"  placeholder="Num de compte du destinataire" value={numCompteR} onChange={handleChangeNumCompteR} /><br/><br/>
                <input type="number"  placeholder="Le montant"  value={montant} onChange={handleChangeMontant} /><br/><br/>
                <input type="password"  placeholder="Votre pin" value={pin} onChange={handleChangePin}/><br/><br/>
                <button type="submit" id="submit-virement-btn" >Valider</button>
            </form>
            <div className="resultat-virement-text" id="result-virement-text"></div>
            </div>
        </div>
    )
}

export default Virement
