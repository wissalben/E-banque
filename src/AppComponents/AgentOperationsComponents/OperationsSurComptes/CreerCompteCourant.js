import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import Title from '../../AgentComponents/Title'
import './CreerCompteCourant.css'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
function CreerCompteCourant(props) {
    const {agent, dispatch} = React.useContext(AuthAgentInfos)
    const [numClient,setNumClient] = useState()
    const [solde,setSolde] = useState()
    const [decouvert,setDecouvert] = useState()
    const [infoCC,setInfosCC] =useState({}) // information compte courant cree
    const [error, setError] = useState(false) // erreur dans les donnees
    const handleChangeNumClient = (e) => {
        setNumClient(e.target.value)
    }
    const handleChangeSolde = (e) => {
        setSolde(e.target.value)
    }
    const handleChangeDecouvert = (e) => {
         setDecouvert(e.target.value)
    }


     
    const handleSubmit = (e) => {
        
        e.preventDefault() ;
        console.log('numclient:',numClient)
        console.log('solde :',solde)
        console.log('decouvert :',decouvert)
        if(!numClient || !solde || !decouvert) {
            setError(true)
        }

    //http://localhost:8050/AGENT/saveCompteCourant?solde=10.0&numeroClient=24&decouvert=200
           else {         
               axios.get(`http://localhost:8050/AGENT/saveCompteCourant?solde=${solde}.0&numeroClient=${numClient}&decouvert=${decouvert}`,agent.token)
                .then(res => {
                   
                    console.log(res.data)
                    setError(false)
                    setInfosCC({...res.data})
                    document.getElementById('requete-result').innerHTML =" Compte courant cree avec succes !"
                    document.getElementById('requete-result').style.color = 'green';
                    
                })
                .catch(err =>{
                        setError(true)  
                }                
                      )  
            
            }
        
    }



    return (
        <div className="creer-comptecourant-container container">
            <Title text="Creer un compte courant" /><br/><br/>
            <div id="requete-result" className="text-center"></div>
            <div className="text-center info-Afournir">{infoCC.codeCompte? `Numero de Compte a fournir au client : ${infoCC.codeCompte}`: ''}</div>
            <div className="text-center info-Afournir">{infoCC.pin? `Le PIN du compte a fournir au client : ${infoCC.pin}` : ''}</div>
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Formulaire compte Courant</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans les donnees saisies':''}</div>
              <input type='number'  className="input-agent-form" placeholder='Num client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='solde' onChange={handleChangeSolde} value={solde}/> <br/><br/>
              <input type='number'  className="input-agent-form" placeholder='decouvert' onChange={handleChangeDecouvert} value={decouvert}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default CreerCompteCourant
