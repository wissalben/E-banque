import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import Title from '../../AgentComponents/Title'

import {AuthAgentInfos} from '../../../AuthAgentInfos'
function SupprimerCompte() {
    const {agent,dispatch} = useContext(AuthAgentInfos);
   const [codeCompte, setCodeCompte] = useState(undefined); 
   const [error, setError] = useState(false) // erreur dans la resiliation
   const [valid, setValid] = useState(false) // resiliation valid 
   const handleChangeCodeCompte = (e) => {
        if(e.target.value.length < 10) setCodeCompte(e.target.value)
   }
   const handleSubmit = (e) => {
       e.preventDefault() 
       axios.post(`http://localhost:8050/AGENT/supprimerCompte?codeCompte=${codeCompte}`,
       {codeCompte:codeCompte},
        agent.token
       )
       .then(() => {
        setError(false)
        document.getElementById('requete-result').innerHTML ="Suppression avec succes !"
        document.getElementById('requete-result').style.color = 'green';
       })
       .catch(err => setError(true))
       
   }
    return (
        <div className="resilier-client-container container">
        <Title text="Supprimer un compte" /><br/><br/>   
        <div id="requete-result" className="text-center"></div>         
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Saisir le numero du compte</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans la suppression':''}</div>
              <input type='number'  className="input-agent-form" placeholder='Num compte' onChange={handleChangeCodeCompte} value={codeCompte}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default SupprimerCompte
