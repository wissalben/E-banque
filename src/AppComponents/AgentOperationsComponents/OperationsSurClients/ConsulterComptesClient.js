import React,{useState,useContext} from 'react'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
import ComptesTable from './ComptesTable'
import Pagination from './Pagination'
import Title from '../../AgentComponents/Title'
import axios from 'axios'
function ConsulterComptesClient(props) {

const {agent,dispatch} = useContext(AuthAgentInfos);
const [numClient, setNumClient] = useState(); 
const [comptesList, setComptesList] = useState([])
const [error, setError] = useState(false) // erreur dans la donnee saisie
const [valid, setValid] = useState(false) // variable auxiliaire pour faire la transition entre l affichage du form et le tableau des comptes
const [loading,setLoading] = useState(false)
//const [numberOfPages, setNumberOfPages] = useState(0) ;
//const [pageSize, setPageSize] = useState(10); // page size
//const [currentPage, setCurrenPage]=useState(0);

const handleChangeNumClient = (e) => {
      setNumClient(e.target.value)
}




const handleSubmit = (e) => {
    e.preventDefault() 
 //// exemple:    localhost:8050/AGENT/client/5/comptes
    axios.get(`http://localhost:8050/AGENT/client/${numClient}/comptes?page=0&size=20`,
     agent.token
    )
    .then((res) => {
       console.log("reeeeeeeeeeeees: ",res)
       setError(false)
       setLoading(true)
       setComptesList([...res.data.content])
       setLoading(false)
       if(res.data.content.length === 0) {setError(true)  }
       if(res.data.content.length !== 0) {setValid(true)  }
      
    })
    .catch(err => setError(true))
    
}
/*const clicked = (pageNum) => {
 setCurrenPage(pageNum)
}*/


if(valid == false) {
  return (
     
     <div className="resilier-client-container container">
     <Title text="Consulter comptes d'un client" /><br/><br/>   
     <div id="requete-result" className="text-center"></div>         
         <form id='form-container' className="text-center" onSubmit={handleSubmit}>
           <p id="autform-title">Saisir le numero du client</p><br/><br/>
           <div className="erreur">{error? 'Action echouee':''}</div>
           <input type='text'  className="input-agent-form" placeholder='Num Client' onChange={handleChangeNumClient} value={numClient}/> <br/><br/>
           <button type='submit' id='valider-btn'>Valider</button> 


       </form> 
     </div>
  )} else {
    return(
  
        <div>
           <Title text={`Liste compte(s) du client avec id ${numClient} :`} /><br/><br/>
             <ComptesTable comptesList={comptesList} loading={loading}/><br/><br/>
             
  
       </div> 
    )}

    
        
 

}

export default ConsulterComptesClient
