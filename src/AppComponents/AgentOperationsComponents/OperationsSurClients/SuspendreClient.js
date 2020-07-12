import React,{useState,useContext,useEffect} from 'react'
import Title from '../../AgentComponents/Title'
import axios from 'axios'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
function SuspendreClient(props) {
    const {agent,dispatch} = useContext(AuthAgentInfos);
   const [numClient, setNumClient] = useState(undefined); 
   const [error, setError] = useState(false) // erreur dans la suspension
   const [valid, setValid] = useState(false) // suspension valide
   const handleChangeNumClient = (e) => {
         setNumClient(e.target.value)
   }
   const handleSubmit = (e) => {
       e.preventDefault() 
       axios.post(` http://localhost:8050/AGENT/suspendreClient?numeroClient=${numClient}`,
       {numeroClient:numClient},
        agent.token
       )
       .then(() => {
        setError(false)
        document.getElementById('requete-result').innerHTML =" Suspension avec succes !"
        document.getElementById('requete-result').style.color = 'green';
       })
       .catch(err => setError(true))
       
   }
    return (
        <div className="suspendre-client-container container">
        <Title text="Suspendre un  client" /><br/><br/>   
        <div id="requete-result" className="text-center"></div>         
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Saisir le numero du client</p><br/><br/>
              <div className="erreur">{error? "Erreur dans la suspension":''}</div>
              <input type='text'  className="input-agent-form" placeholder='Num Client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default SuspendreClient
