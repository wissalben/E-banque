import React,{useState,useContext,useEffect} from 'react'
import './ClientAcceuil.css'
import {AuthUserInfos} from '../../AuthUserInfos'
import imgConfirmation from '../images/confirmation.png'
import Title from '../HomePageComponents/Title'
import ComptesList from './ComptesList'
import axios from 'axios'
const _API_URL = 'http://localhost:8050'
const CLIENT_API_URL = `${_API_URL}/CLIENT/currentClient/Comptes`
function ClientAcceuil() {
    const {user, dispatch} =useContext(AuthUserInfos) ;
    const [comptes,setComptes] = useState([]) ;
    console.log("from Client acceuil check token :"+user.token)
    
    useEffect(() => {
            document.title = 'Acceuil'

        async function fetchComptes() {
        try {
            
            const res = await axios.get(`${CLIENT_API_URL}`, user.token ) 

            //let obj = res.data
            dispatch({type:'Accout-Infos',Comptes:[...res.data.content]})
           console.log('the result of api call is(les comptes)  :',res.data.content)
           setComptes([...res.data.content])
          
        }
        catch (err) {
            console.log(err + " ouii")
            
        }
    }
          fetchComptes()
        } ,[])
    
    return (
        <div className="container client-acceuil-container">
            <div className="row">
                <div className="col-md-6" id="st-col">
                  <p className="client-acceuil-text">Bienvenue <span id="name-client"> {user.userInformations.nom} {user.userInformations.prenom} </span> dans votre banque en ligne</p>
                  <p className="client-acceuil-text"> pour effectuer toutes vos operations veuillez</p> 
                  <p className="client-acceuil-text">selectionner un de vos compte(s) bancaire .</p>
                </div>
                <div className="img-confirmation-container col-md-6">
                    <img className="img-fluid" src={imgConfirmation}/>
                </div>
            </div>
            <Title text="Vos comptes" id="vos-compte-title"/>
            <ComptesList comptesInfos={comptes} />

        </div>
    )
}

export default ClientAcceuil
