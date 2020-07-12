import React,{useState,useContext,useEffect} from 'react'
import Title from '../../AgentComponents/Title'
import  './EnrollerClient.css'
import axios from 'axios'
import {AuthAgentInfos} from '../../../AuthAgentInfos'

function EnrollerClient(props) {
    const {agent, dispatch} = React.useContext(AuthAgentInfos)
    const [nom,setNom] = useState('')
    const [prenom,setPrenom] = useState('')
    const [dateNaissance,setDateNaissance] = useState('')
    const [cni,setCni] = useState('')
    const [adresse,setAdresse] = useState('')
    const [fonction,setFonction] = useState('')
    const [statusSocial,setStatusSocial] = useState('')
    const [error, setError] = useState(false) // erreur dans les donnees
    const [pseudo,setPseudo] = useState('')
    const [mdp, setMdp] = useState('')
    const handleChangeNom = (e) => {
       setNom(e.target.value)
    }
    const handleChangePrenom = (e) => {
        setPrenom(e.target.value)
    }
    const handleChangeDateN = (e) => {
        if(e.target.value.length <11) setDateNaissance(e.target.value)
    }
    const handleChangeCni = (e) => {
        if(e.target.value.length <9) setCni(e.target.value)

    }
    const handleChangeAdresse = (e) => {
        setAdresse(e.target.value)
    }
    const handleChangeFonction = (e) => {
        setFonction(e.target.value)
    }
    const handleChangeStatusS = (e) => {
        setStatusSocial(e.target.value)
    }
     
    const handleSubmit = (e) => {
        
        e.preventDefault() ;
        console.log('props are : ',props)
        console.log('nom :',nom)
        console.log('prenom :',prenom)
        console.log('date naiss :',dateNaissance)
        console.log('cin :',cni)
        console.log('adresse :',adresse)
        console.log('fonction :',fonction)
        console.log('status social :',statusSocial)
        console.log('isDatevalid ?  ',validDate(dateNaissance))
        if(validDate(dateNaissance) == false || cni.length != 8 ) {
            setError(true) ;
             } else {
              //  http://localhost:8050/AGENT/saveClient?nom=Ahmed&prenom=Said&dateNaissance=03/03/1985&adresse=ADRESSE&fonction=FONCTION&statusSocial=STATUSSOCIAL&CNI=EE5555555&numeroAgent=2    
                       
              axios.get(`http://localhost:8050/AGENT/saveClient?nom=${nom}&prenom=${prenom}&dateNaissance=${dateNaissance}&adresse=${adresse}&fonction=${fonction}&statusSocial=${statusSocial}&CNI=${cni}&numeroAgent=${props.match.params.agent_id}`,agent.token)
                .then(res => {
                    console.log("dkhlna l rest api saveclient")
                    console.log(res)
                    setError(false)
                    document.getElementById('requete-result').innerHTML =" Client est enregistre avec succes !"
                    document.getElementById('requete-result').style.color = 'green';
                    setPseudo(res.data.nomUtilisateur)
                    setMdp(res.data.motDePasse)
                    
                })
                .catch(err =>{
                    document.getElementById('requete-result').innerHTML =" Enregistrement est echoue" ;
                    document.getElementById('requete-result').style.color = 'red';    
                }                
                      )
            }
             
        
    }
    const validDate = (date) => {

        let tab = date.split('/') ;
        let dd = parseInt(tab[0]) ;
        let mm = parseInt(tab[1])  ;
        let yyyy = parseInt(tab[2]) ;
        if(tab.length != 3) { return false }

        return (dd>=1 && dd<=31)&&(mm>=1 && mm<=12)&&(yyyy>=1920&&yyyy<=2020)

    }


    return (
        <div className="enroller-client-container container">
            <Title text="Enroller un nouveau client" /><br/><br/>
            <div id="requete-result" className="text-center"></div>
            <div className="pseudo text-center">{pseudo? `Nom utilisateur a fournir au client (pseudo): ${pseudo}`: ''}</div>
            <div className="mot-de-passe text-center">{mdp? `Le mot de passe a fournir au client (code secret): ${mdp}` : ''}</div>
            <form id='form-container' className="text-center" onSubmit={handleSubmit}>
              <p id="autform-title">Formulaire d'enrollement</p><br/><br/>
              <div className="erreur">{error? 'Erreur dans les donnees saisies':''}</div>
              <input type='text'  className="input-agent-form" placeholder='Nom' onChange={handleChangeNom} value={nom}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='Prenom' onChange={handleChangePrenom} value={prenom}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='dd/MM/yy' onChange={handleChangeDateN} value={dateNaissance}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='Cin' onChange={handleChangeCni} value={cni}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='Adresse' onChange={handleChangeAdresse} value={adresse}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='Fonction' onChange={handleChangeFonction} value={fonction}/> <br/><br/>
              <input type='text'  className="input-agent-form" placeholder='Status Social' onChange={handleChangeStatusS} value={statusSocial} /> <br/><br/>
              <button type='submit' id='valider-btn'>Valider</button> 

              
              

          </form> 
        </div>
    )
}

export default EnrollerClient
