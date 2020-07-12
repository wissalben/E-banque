import React,{useState,useContext} from 'react'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
import Title from '../../AgentComponents/Title'
import axios from 'axios'

function ConsulterUnClient(props) {
  const {agent,dispatch} = useContext(AuthAgentInfos);
   const [numClient, setNumClient] = useState(undefined); 
   const [infoClient, setInfoClient] = useState({})
   const [error, setError] = useState(false) // erreur dans la consultation du client
   const [valid, setValid] = useState(false) // resiliation valid 
   const handleChangeNumClient = (e) => {
         setNumClient(e.target.value)
   }
   const handleSubmit = (e) => {
       e.preventDefault() 
        // exemple:    localhost:8050/AGENT/client/5
       axios.get(`http://localhost:8050/AGENT/client/${numClient}`,
        agent.token
       )
       .then((res) => {
           console.log(res);
           setError(false)
           setInfoClient({...res.data})
           setValid(true)
           
        /*document.getElementById('requete-result').innerHTML =" Resiliation avec succes !"
        document.getElementById('requete-result').style.color = 'green';*/
       })
       .catch(err => setError(true))
       
   }
   if(valid == false) {
    return (
        <div className="resilier-client-container container">
        <Title text="Consulter un  client" /><br/><br/>   
        <div id="requete-result" className="text-center"></div>         
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Saisir le numero du client</p><br/><br/>
              <div className="erreur">{error? 'Action echouee':''}</div>
              <input type='text'  className="input-agent-form" placeholder='Num Client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    ) }
    else{
        return (
           <div>

           <table className="table table-hover container " style={{marginTop : "15%"}}>
                <thead>
                  <tr>
                    <th scope="col">Id client</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">CIN</th>
                    <th scope="col">Pseudo</th>
                    <th scope="col">Active</th>
                    <th scope="col">Date Naissance</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Fonction</th>
                    <th scope="col">Status social</th>
                  </tr>
                </thead>
                <tbody>
                   {
                       
                       
                         <tr>
                         <th  scope="row"> {infoClient.numeroClient} </th>
                         <td> {infoClient.nom ? infoClient.nom : '-' } </td>
                         <td> {infoClient.prenom ? infoClient.prenom: '-' } </td>
                         <td> {infoClient.cni ? infoClient.cni: '-' } </td>
                         <td> {infoClient.nomUtilisateur ? infoClient.nomUtilisateur: '-' } </td>
                         <td> {infoClient.active ? 'oui': 'non' } </td>
                         <td> {infoClient.dateNaissance ? infoClient.dateNaissance.slice(0,10): '-' } </td>
                         <td> {infoClient.adresse ? infoClient.adresse: '-' } </td>
                         <td> {infoClient.fonction ? infoClient.fonction: '-' } </td>
                         <td> {infoClient.statusSocial ? infoClient.statusSocial: '-' } </td>
                         
                         </tr> 
                     
                   }
                
             </tbody> 
           </table>
 
           
         </div>

           
        )

    } 

}

export default ConsulterUnClient
