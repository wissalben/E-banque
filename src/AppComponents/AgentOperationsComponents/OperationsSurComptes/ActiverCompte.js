import React, {useEffect,useState,useContext} from 'react'
import Title from '../../AgentComponents/Title'
import axios from 'axios'
import {AuthAgentInfos} from '../../../AuthAgentInfos'

function ActiverCompte(props) {

    const {agent,dispatch} = useContext(AuthAgentInfos);
    const [numCompte,setNumCompte] = useState();
    const [errorD,setErrorD] = useState(false) // error dans donnee saisie

    const handleChangeNumCompte = (e) => {
        if(e.target.value.length < 10 ) setNumCompte(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault() ;
        document.getElementById('requete-result').innerHTML = ' ' ;
        setErrorD(false)
        axios.post(`http://localhost:8050/AGENT/activerCompte?codeCompte=${numCompte}`,
        {codeCompte:numCompte}
        ,agent.token)
        .then(res => {
            console.log("result rest api call activer client ",res.data) ;
            document.getElementById('requete-result').innerHTML = 'Code active avec succes' ;
            document.getElementById('requete-result').style.textColor = 'green'

        })
        .catch(err => {
            console.log('error dans rest api call of operations : ',err)
            setErrorD(true)
         })
    }
    
    return (
            <div className="activer-compte-container container">
              <Title text="Activer compte" /><br/><br/>   
              <div id="requete-result" className="text-center"></div>         
                  <form id='form-container' className="text-center" onSubmit={handleSubmit}>
                    <p id="autform-title">Saisir le numero de compte</p><br/><br/>
                    <div className="erreur">{errorD? 'Action echouee':''}</div>
                    <input type='number'  className="input-agent-form" placeholder='Numero de compte' onChange={handleChangeNumCompte} value={numCompte}/> <br/><br/>
                    <button type='submit' id='valider-btn'>Valider</button> 
      
                    
                    
      
                </form> 
              </div>
       )
}

export default ActiverCompte
