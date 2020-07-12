import React, {useEffect,useState,useContext} from 'react'
import './HistoriqueOperations.css'
import Title from '../HomePageComponents/Title'
import HistoOperationsTable from './HistoOperationsTable'
import Pagination from './Pagination'
import {AuthUserInfos} from '../../AuthUserInfos'
import axios from 'axios'
function HistoriqueOperations(props) {
    const {user,dispatch} = useContext(AuthUserInfos);
    const [operations,setOperations] = useState([]) ;
    const [loading, setLoading] = useState(false);
    // nb de pages pour le passer en props au composant de pagination
    const [numberOfPages, setNumberOfPages] = useState(0) ;
    const [pageSize, setPageSize] = useState(5); // page size
    const [currentPage, setCurrenPage]=useState(0);
    const [error, setError] = useState(false);
    
    useEffect(() => {
       document.title = 'Historique des operations'
    },[])
    
    useEffect(() => {
      fetchOperations()

        
    } ,[currentPage,pageSize,numberOfPages])

    const fetchOperations = () => {
               setError(false)
               setLoading(true)
              // localhost:8050/CLIENT/compte/4865000001/operations
              axios.get(`http://localhost:8050/CLIENT/compte/${props.match.params.compte_id}/operations?page=${currentPage}&size=${pageSize}`,user.token)
              .then(res => {
                  console.log("result rest api call histo operation",res.data) ;
                  setOperations([...res.data.content]) ;
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
           <div className="historique-operations-container container">
   
                <Title text="Historique des operations" /><br/><br/>
                <div className="page-num">{operations.length!=0 ? ` Page N : ${currentPage + 1}` : ''}</div>
                <HistoOperationsTable operationsList={operations} loading={loading}/><br/><br/>
                <Pagination clicked={clicked} nbrePages={numberOfPages} pageSize={pageSize} toAppear={operations.length}/>
              
                {/* toAppear prend 0 ou une valeur diff de 0 elle nous permet de savoir si les boutons de pagination vont s'afficher ou non */}
                <br/><br/>
             </div>
       ) }

}

export default HistoriqueOperations
