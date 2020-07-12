import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import Title from '../../AgentComponents/Title'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
function Retirer(props) {
    const {agent, dispatch} = React.useContext(AuthAgentInfos)
    const [numCompte,setNumCompte] = useState()
    const [montant,setMontant] = useState()
    const [error, setError] = useState(false) // erreur dans les donnees
    const handleChangeNumCompte = (e) => {
        if(e.target.value.length < 10) setNumCompte(e.target.value)
    }
    const handleChangeMontant = (e) => {
        setMontant(e.target.value)
    }



     
    const handleSubmit = (e) => {
        
        e.preventDefault() ;
        console.log('numCompte:',numCompte)
        console.log('montant :',montant)
        if(!numCompte || numCompte.length != 9|| !montant ) {
            document.getElementById('requete-result').innerHTML = " ";
            setError(true)
        }

      // http://localhost:8050/AGENT/Retirer?codeCompte=4856000001&montant=400.0
           else {         
               axios.post(`http://localhost:8050/AGENT/Retirer?codeCompte=${numCompte}&montant=${montant}`,
               { codeCompte:numCompte , montant:montant } ,
               agent.token)
                .then(res => {
                   
                    console.log(res)
                    setError(false)
                    document.getElementById('requete-result').innerHTML =" Retrait effectue avec succes !"
                    document.getElementById('requete-result').style.color = 'green';
                    
                })
                .catch(err =>{
                       document.getElementById('requete-result').innerHTML = " ";
                        setError(true) ;
                        
                         
                }                
                      )  
            
            }
        
    }



    return (
        <div className="verser-container container">
            <Title text="Effectuer un retrait" /><br/><br/>
            <div id="requete-result" className="text-center"></div>
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Formulaire de retrait</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans les donnees saisies':''}</div>
              <input type='number'  className="input-agent-form" placeholder='Num de compte' onChange={handleChangeNumCompte} value={numCompte}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='montant' onChange={handleChangeMontant} value={montant}/> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default Retirer
