import React , {useState,useEffect,useContext} from 'react'
import Title from './Title'
import './AuthForm.css'
import axios from 'axios'
import {AuthAgentInfos} from '../../AuthAgentInfos' // AuthAgentInfos is a context 


function AuthForm(props) {
    
   
    const {agent, dispatch} =useContext(AuthAgentInfos)
    const [pseudo, setPseudo] = useState('');
    const [codeSecret, setCodeSecret] = useState('');
   // const [nonActif ,setNonActif] =useState(false)
    const [error, setError] = useState(false);

   useEffect(() => {
        document.title = 'Authentification'
      },[])

    const handleChangePseudo = (e) => {
        setPseudo(e.target.value) ;
    }
    const handleChangeCodeSecret = (e) => {
        setCodeSecret(e.target.value);
    }    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(pseudo+" "+codeSecret) ;
        console.log('executed service') ;
        try {  
            const res = await axios.get('http://localhost:8050/AGENT/currentAgent', { headers: { authorization: 'Basic ' + window.btoa(pseudo + ":" + codeSecret) } })
            let Tok = { headers: { authorization: 'Basic ' + window.btoa(pseudo + ":" + codeSecret) } }
            console.log("TOOOOOK: ",Tok)
            let obj = res.data
            console.log("res data of api call is : ",res.data)
            dispatch({type:'agentIsAuthentificated',payload:{...res.data},token:{...Tok}})
            props.history.push(`/agent/${obj.numeroAgent}`)
           /*
            if(res.data.active) { props.history.push(`/client/${obj.numeroClient}`) }
            else {
                setNonActif(true)
                document.getElementById('inactif').innerHTML = " Votre compte n'est pas active ! Veuillez regles vos problemes ."
            }  */
        }
        catch (err) {
            console.log(err + " ouii")
            setError(true)
        }
    }
    return (
        <div className="authform-container container">
            <br/><br/>
         {/*<Title text="Authentifiez-vous" />*/}
          <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Formulaire d'authentification</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans le pseudo ou le mot de passe':''}</div>
              <input type='text' id="pseudo" className="input-auth-form" placeholder='Votre Pseudo' value={pseudo} onChange={handleChangePseudo}/> <br/><br/><br/>
              <input type='password' id="codeSecret"className="input-auth-form" placeholder='Votre Code Secret' value={codeSecret} onChange={handleChangeCodeSecret}/> <br/><br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 
              
              

          </form>  
        </div>
    )
}

export default AuthForm ;
