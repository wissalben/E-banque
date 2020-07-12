import React,{useState, useContext} from 'react'
import Title from '../../AgentComponents/Title'
import axios from 'axios'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
function ResilierClient(props) {
    const {agent,dispatch} = useContext(AuthAgentInfos);
   const [numClient, setNumClient] = useState(undefined); 
   const [error, setError] = useState(false) // erreur dans la resiliation
   const [valid, setValid] = useState(false) // resiliation valid 
   const handleChangeNumClient = (e) => {
         setNumClient(e.target.value)
   }
   const handleSubmit = (e) => {
       e.preventDefault() 
       axios.post(` http://localhost:8050/AGENT/supprimerClient?numeroClient=${numClient}`,
       {numeroClient:numClient},
        agent.token
       )
       .then(() => {
        setError(false)
        document.getElementById('requete-result').innerHTML =" Resiliation avec succes !"
        document.getElementById('requete-result').style.color = 'green';
       })
       .catch(err => setError(true))
       
   }
    return (
        <div className="resilier-client-container container">
        <Title text="Resilier un  client" /><br/><br/>   
        <div id="requete-result" className="text-center"></div>         
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Saisir le numero du client</p><br/><br/>
              <div className="erreur">{error? 'Erreur de resiliation':''}</div>
              <input type='text'  className="input-agent-form" placeholder='Num Client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default ResilierClient
