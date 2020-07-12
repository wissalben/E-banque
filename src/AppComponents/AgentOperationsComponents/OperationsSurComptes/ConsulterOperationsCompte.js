import React, {useEffect,useState,useContext} from 'react'
import Title from '../../AgentComponents/Title'
import Pagination from './Pagination'
import OperationsTable from './OperationsTable'
import axios from 'axios'
import {AuthAgentInfos} from '../../../AuthAgentInfos'

function ConsulterOperationsCompte(props) {
    const {agent,dispatch} = useContext(AuthAgentInfos);
    const [numCompte,setNumCompte] = useState();
    const [operations,setOperations] = useState([]) ;
    const [loading, setLoading] = useState(false);
    // nb de pages pour le passer en props au composant de pagination
    const [numberOfPages, setNumberOfPages] = useState(0) ;
    const [pageSize, setPageSize] = useState(5); // page size
    const [currentPage, setCurrenPage]=useState(0);
    const [valid, setValid] = useState(false) // variable d'aide dans l'affichage du tableau des operations
    const [error, setError] = useState(false);
    const [errorD,setErrorD] = useState(false) // error dans donnee saisie
    
   const handleSubmit = (e) => {
       e.preventDefault();
       if(numCompte.length != 9 ){ setErrorD(true) }
       else {
       fetchOperations(currentPage,pageSize)
       }
   }

    const handleChangeNumCompte = (e) => {
        if(e.target.value.length < 10 ) setNumCompte(e.target.value)
    }
    const fetchOperations = (currentPage,pageSize) => {
               setLoading(true)
               //http://localhost:8050/AGENT/compte/5/operations?page=0&size=5
              axios.get(`http://localhost:8050/AGENT/compte/${numCompte}/operations?page=${currentPage}&size=${pageSize}`,agent.token)
              .then(res => {
                  console.log("result rest api call histo operation",res.data) ;
                  setOperations([...res.data.content]) ;
                  setNumberOfPages(res.data.totalPages) ;
                  setLoading(false)
                  setValid(true)
      
              })
              .catch(err => {
                  console.log('error dans rest api call of operations : ',err)
                  setError(true)
               })
    }
    const clicked = (pageNum) => {
      setCurrenPage(pageNum) ;
      fetchOperations(pageNum,pageSize)
      
     }

     if(error) return <h3 className="container"> Une erreur est parvenue quelque part</h3>
      
     else if(!valid) {
       return (
            <div className="consulter-operationcompte-container container">
              <Title text="Consulter un  compte" /><br/><br/>   
              <div id="requete-result" className="text-center"></div>         
                  <form id='form-container' className="text-center" onSubmit={handleSubmit}>
                    <p id="autform-title">Saisir le numero de compte</p><br/><br/>
                    <div className="erreur">{errorD? 'Action echouee':''}</div>
                    <input type='number'  className="input-agent-form" placeholder='Numero de compte' onChange={handleChangeNumCompte} value={numCompte}/> <br/><br/>
                    <button type='submit' id='valider-btn'>Valider</button> 
      
                    
                    
      
                </form> 
              </div>
       ) }

       else {
        return (
            <div className="historique-operations-container container">
    
                 <Title text="Conslter operations d'un compte" /><br/><br/>
                 <div className="page-num text-center">{operations.length!=0 ? ` Page N : ${currentPage + 1}` : ''}</div>
                 <OperationsTable operationsList={operations} loading={loading}/><br/><br/>
                 <Pagination clicked={clicked} nbrePages={numberOfPages} pageSize={pageSize} toAppear={operations.length}/>
               
                 {/* toAppear prend 0 ou une valeur diff de 0 elle nous permet de savoir si les boutons de pagination vont s'afficher ou non */}
                 <br/><br/>
              </div>
        ) }
           
       }


export default ConsulterOperationsCompte
