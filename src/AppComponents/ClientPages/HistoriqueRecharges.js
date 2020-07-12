import React, {useEffect,useState,useContext} from 'react'
import './HistoriqueRecharges.css'
import Title from '../HomePageComponents/Title'
import Pagination from './Pagination'
import HistoRechargeTable from './HistoRechargeTable'
import {AuthUserInfos} from '../../AuthUserInfos'
import axios from 'axios'

function HistoriqueRecharges(props) {
    const {user,dispatch} = useContext(AuthUserInfos);
    const [recharges,setRecharges] = useState([]) ;
    const [loading, setLoading] = useState(false);
    // nb de pages pour le passer en props au composant de pagination
    const [numberOfPages, setNumberOfPages] = useState(0) ;
    const [pageSize, setPageSize] = useState(5); // page size
    const [currentPage, setCurrenPage]=useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
      document.title = 'Historique des recharges'
   },[])

    useEffect(() => {
      fetchRecharges()

    } ,[currentPage,pageSize,numberOfPages])
     const fetchRecharges = () => {
       setError(false)
      setLoading(true); 
      axios.get(`http://localhost:8050/CLIENT/${props.match.params.client_id}/Recharges?page=${currentPage}&size=${pageSize}`,user.token)
      .then(res => {
          
          console.log(res.data) ;
          setRecharges([...res.data.content]) ;
          setNumberOfPages(res.data.totalPages) ;
          setLoading(false)
          

      })
      .catch(err => {
          console.log('error dans rest api call of recharges : ',err)
          setError(true)
       })

      
  }
  const clicked = (pageNum) => {
    setCurrenPage(pageNum)
   }
  // user the methode filter to recharges array and pass the new array as 'rechargesList' props
   const listRechargeCurrentAccount = recharges.filter(recharge => recharge.codeCompte == props.match.params.compte_id)
  if(error) return <h3 className="container"> Une erreur est parvenue quelque part</h3>
  else {
    return (
        <div className="historique-recharges-container">

             <Title text="Historique des recharges" /><br/><br/>
             <div className="page-num">{listRechargeCurrentAccount.length!=0 ? ` Page N : ${currentPage + 1}` : ''}</div>
             <HistoRechargeTable rechargesList={listRechargeCurrentAccount} loading={loading}/><br/><br/>
             <Pagination clicked={clicked} nbrePages={numberOfPages} pageSize={pageSize} toAppear={listRechargeCurrentAccount.length}/>
             {/* toAppear prend 0 ou une valeur diff de 0 elle nous permet de savoir si les boutons de pagination vont s'afficher ou non */}
             <br/><br/>
          </div>
    ) }
}

export default HistoriqueRecharges
