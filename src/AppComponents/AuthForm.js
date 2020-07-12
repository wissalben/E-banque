import React , {useState,useEffect,useContext} from 'react'
import Title from './HomePageComponents/Title'
import iconAuth from './images/icon-authentification.PNG'
import './AuthForm.css'
import axios from 'axios'
import {AuthUserInfos} from '../AuthUserInfos' // AuthUserInfos is a context 
const API_URL = 'http://localhost:8050'
const CLIENT_API_URL = `${API_URL}/CLIENT/currentClient`
 
function AuthForm(props) {
    
   
    const {user, dispatch} =useContext(AuthUserInfos)
    const [pseudo, setPseudo] = useState('');
    const [codeSecret, setCodeSecret] = useState('');
    const [nonActif ,setNonActif] =useState(false)
    const [error, setError] = useState(false);
    
   useEffect(() => {
        document.title = 'Authentification'
        
      })

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
            const res = await axios.get(`${CLIENT_API_URL}`, { headers: { authorization: 'Basic ' + window.btoa(pseudo + ":" + codeSecret) } })
            let Tok = { headers: { authorization: 'Basic ' + window.btoa(pseudo + ":" + codeSecret) } }
            console.log("TOOOOOK: ",Tok)
            let obj = res.data
            console.log(" ********* res data : ",res.data)
            dispatch({type:'userIsAuthentificated',payload:{...res.data},token:{...Tok}})
            

            if(res.data.active) { props.history.push(`/client/${obj.numeroClient}`) }
            else {
                setNonActif(true)
                document.getElementById('inactif').innerHTML = " Votre compte n'est pas active ! Veuillez regles vos problemes ."
            }
        }
        catch (err) {
            console.log(err + " ouii")
            setError(true)
        }
    }
    return (
        <div className="authform-container container">
         <Title text="Authentifiez-vous" />
         <p id="authform-text">Remplissez le formulaire ci-dessous, ça sera votre premiere étape pour bénéficier de nos services en ligne. ( les deux données à remplir dans le formulaire sont  fournies par votre agent bancaire )</p>
          <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Formulaire d'authentification</p>
              <div > <img id="img-auth-cont" src={iconAuth} className="img-fluid"/> </div><br/><br/>
              <div id="inactif"></div>
              <div className="erreur">{error? 'Erreur dans le pseudo ou le mot de passe':''}</div>
              <input type='text' id="pseudo" className="input-auth-form" placeholder='Votre Pseudo' value={pseudo} onChange={handleChangePseudo}/> <br/><br/><br/>
              <input type='password' id="codeSecret"className="input-auth-form" placeholder='Votre Code Secret' value={codeSecret} onChange={handleChangeCodeSecret}/> <br/><br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 
              
              

          </form>  
        </div>
    )
}

export default AuthForm ;
