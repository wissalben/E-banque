import React, {useEffect,useState,useContext} from 'react'
import Title from '../../AgentComponents/Title'
import ClientsTable from './ClientsTable'
import Pagination from './Pagination'
import {AuthAgentInfos} from '../../../AuthAgentInfos'
import axios from 'axios'

function ConsulterMesClients(props) {
    const {agent,dispatch} = useContext(AuthAgentInfos);
    const [clientsList,setClientsList] = useState([]) ;
    const [loading, setLoading] = useState(false);
    // nb de pages pour le passer en props au composant de pagination
    const [numberOfPages, setNumberOfPages] = useState(0) ;
    const [pageSize, setPageSize] = useState(5); // page size
    const [currentPage, setCurrenPage]=useState(0);
    const [error, setError] = useState(false);
    
    useEffect(() => {
       document.title = 'Consulter Mes Clients'
    },[])
    
    useEffect(() => {
      fetchOperations()

        
    } ,[currentPage,pageSize,numberOfPages])

    const fetchOperations = () => {
               setLoading(true)
              axios.get(`http://localhost:8050/AGENT/currentAgent/clients?page=${currentPage}&size=${pageSize}`,agent.token)
              .then(res => {
                  console.log("result rest api call consulter mes client",res.data) ;
                  setError(false)
                  setClientsList([...res.data.content]) ;
                  setNumberOfPages(res.data.totalPages) ;
                  setLoading(false) 
      
              })
              .catch(err => {
                  console.log('error dans rest api call of operations : ',err)
                  setError(true) 
               })
    }
    const clicked = (pageNum) => {
      setCurrenPage(pageNum)
     }

     if(error) return <h3 className="container"> Une erreur est parvenue quelque part</h3>
     else {
       return (
           <div className="consulter-clients-container container">
   
                <Title text="Listes des clients" /><br/><br/>
               <div className="page-num text-center" style={{fontSize :"15pt",fontWeight: "600"}}>{clientsList.length!=0 ? ` Page N : ${currentPage + 1}` : ''}</div><br/><br/>
                <ClientsTable clientsList={clientsList} loading={loading}/><br/><br/>
                <Pagination clicked={clicked} nbrePages={numberOfPages} pageSize={pageSize} toAppear={clientsList.length}/> 
              
                {/* toAppear prend 0 ou une valeur diff de 0 elle nous permet de savoir si les boutons de pagination vont s'afficher ou non */}
                <br/><br/>
             </div>
       ) }
}

export default ConsulterMesClients
