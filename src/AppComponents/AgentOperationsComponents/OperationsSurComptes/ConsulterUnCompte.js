import React,{useState,useContext} from 'react'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
import Title from '../../AgentComponents/Title'
import axios from 'axios'
function ConsulterUnCompte(props) {
 
        const {agent,dispatch} = useContext(AuthAgentInfos);
         const [numCompte, setNumCompte] = useState(undefined); 
         const [infosCompte, setInfosCompte] = useState({})
         const [error, setError] = useState(false) // erreur 
         const [valid, setValid] = useState(false) // consultation valid 
         const handleChangeNumCompte = (e) => {
              if(e.target.value.length < 10) setNumCompte(e.target.value)
         }
         const handleSubmit = (e) => {
             e.preventDefault() 
  
              // exemple:    localhost:8050/AGENT/compte/4552000005
             axios.get(`http://localhost:8050/AGENT/compte/${numCompte}`,
              agent.token
             )
             .then((res) => {
                 console.log(res);
                 setError(false)
                 setInfosCompte({...res.data})
                 setValid(true)

             })
             .catch(err => setError(true))
             
         }
         if(valid == false) {
          return (
              <div className="resilier-client-container container">
              <Title text="Consulter un compte" /><br/><br/>   
              <div id="requete-result" className="text-center"></div>         
                  <form id='form-container' className="text-center" onSubmit={handleSubmit}>
                    <p id="autform-title">Saisir le numero de compte</p><br/><br/>
                    <div className="erreur">{error? 'Action echouee':''}</div>
                    <input type='text'  className="input-agent-form" placeholder='Num de compte' onChange={handleChangeNumCompte} value={numCompte}/> <br/><br/>
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
                        <th scope="col"></th>
                         <th scope="col">Actif</th>
                         <th scope="col">Code compte</th>
                         <th scope="col">Date creation</th>
                         <th scope="col">Type compte</th>
                         <th scope="col">Pin</th>
                         <th scope="col">Solde</th>
                        </tr>
                      </thead>
                      <tbody>
                         {
                             
                             
                            <tr>
                               
                              <th  scope="row">  </th>
                              <td> {infosCompte.actif ? 'oui' : 'non' } </td>
                              <td> {infosCompte.codeCompte ? infosCompte.codeCompte: '-' } </td>
                              <td> {infosCompte.dateCreation ? infosCompte.dateCreation.slice(0,10): '-' } </td>
                              <td> {infosCompte.decouvert ? 'courant': 'epargne' } </td>
                              <td> {infosCompte.pin ? infosCompte.pin: '-' } </td>
                              <td> {infosCompte.solde ? infosCompte.solde: '-' } </td>
                         
                         
                               
                            </tr> 
                           
                         }
                      
                   </tbody> 
                 </table>
       
                 
               </div>
      
                 
              )
      
          } 
      
      }


export default ConsulterUnCompte

