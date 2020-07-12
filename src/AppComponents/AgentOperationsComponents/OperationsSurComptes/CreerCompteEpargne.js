import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import Title from '../../AgentComponents/Title'
import {AuthAgentInfos} from '../../../AuthAgentInfos'

function CreerCompteEpargne(props) {
    const {agent, dispatch} = React.useContext(AuthAgentInfos)
    const [numClient,setNumClient] = useState()
    const [solde,setSolde] = useState()
    const [taux,setTaux] = useState()
    const [infoCE,setInfosCE] =useState({}) // information compte courant cree
    const [error, setError] = useState(false) // erreur dans les donnees
    const handleChangeNumClient = (e) => {
        setNumClient(e.target.value)
    }
    const handleChangeSolde = (e) => {
        setSolde(e.target.value)
    }
    const handleChangeTaux = (e) => {
         setTaux(e.target.value)
    }


     
    const handleSubmit = (e) => {
        
        e.preventDefault() ;
        console.log('numclient:',numClient)
        console.log('solde :',solde)
        console.log('taux :',taux)
        if(!numClient || !solde || !taux) {
            setError(true)
        }

    //http://localhost:8050/AGENT/saveCompteEpargne?solde=10.0&numeroClient=24&taux=2.0
           else {         
               axios.get(`http://localhost:8050/AGENT/saveCompteEpargne?solde=${solde}&numeroClient=${numClient}&taux=${taux}`,agent.token)
                .then(res => {
                   
                    console.log(res.data)
                    setError(false)
                    setInfosCE({...res.data})
                    document.getElementById('requete-result').innerHTML =" Compte epargne cree avec succes !"
                    document.getElementById('requete-result').style.color = 'green';
                    
                })
                .catch(err =>{
                        setError(true)  
                }                
                      )  
            
            }
        
    }



    return (
        <div className="creer-compteepargne-container container">
            <Title text="Creer un compte epargne" /><br/><br/>
            <div id="requete-result" className="text-center"></div>
            <div className="text-center info-Afournir">{infoCE.codeCompte? `Numero de Compte a fournir au client : ${infoCE.codeCompte}`: ''}</div>
            <div className="text-center info-Afournir">{infoCE.pin? `Le PIN du compte a fournir au client : ${infoCE.pin}` : ''}</div>
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Formulaire compte Epargne</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans les donnees saisies':''}</div>
              <input type='number'  className="input-agent-form" placeholder='Num client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='solde' onChange={handleChangeSolde} value={solde}/> <br/><br/>
              <input type='number'  className="input-agent-form" placeholder='taux' onChange={handleChangeTaux} value={taux}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default CreerCompteEpargne
