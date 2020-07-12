import React,{useState,useContext} from 'react'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
import Title from '../../AgentComponents/Title'
import axios from 'axios'

function ModifierMDP(props) {
    const {agent, dispatch} = React.useContext(AuthAgentInfos)
    const [numClient,setNumClient] = useState('')
    const [error, setError] = useState(false) // erreur dans les donnees
    const [pseudo,setPseudo] = useState('')
    const [mdp, setMdp] = useState('')

    const handleChangeNumClient = (e) => {
       setNumClient(e.target.value)
    }


     
    const handleSubmit = (e) => {
        
        e.preventDefault() ;
        console.log('props are : ',props)
        console.log('numClient :',numClient)

                     
              axios.get(`http://localhost:8050/AGENT/modifierMotdePasse?numeroClient=${numClient}`,agent.token)
                .then(res => {
                    console.log("dkhlna l rest api modifier mot de passe")
                    console.log(res)
                    setError(false)
                    document.getElementById('requete-result').innerHTML =" Mot de passe modifie avec succes !"
                    document.getElementById('requete-result').style.color = 'green';
                    setPseudo(res.data.nomUtilisateur)
                    setMdp(res.data.motDePasse)
                    
                })
                .catch(err =>{
                    document.getElementById('requete-result').innerHTML =" Modification a echoue" ;
                    document.getElementById('requete-result').style.color = 'red';    
                }                
                      )
            
             
        
    }



    return (
        <div className="modifier-mdp-container container">
            <Title text="Modifier mot de passe" /><br/><br/>
            <div id="requete-result" className="text-center"></div>
            <div className="pseudo text-center">{pseudo? `Nom utilisateur a fournir au client (pseudo): ${pseudo}`: ''}</div>
            <div className="mot-de-passe text-center">{mdp? `Le mot de passe a fournir au client (code secret): ${mdp}` : ''}</div>
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Modification Mot de passe</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans les donnees saisies':''}</div>
              <input type='number'  className="input-agent-form" placeholder='Num client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default ModifierMDP
