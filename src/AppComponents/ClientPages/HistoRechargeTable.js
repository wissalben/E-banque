import React from 'react'
import './HistoRechargeTable.css'
function HistoRechargeTable(props) {
   if(props.loading) {
       return <h4 className="text-center">Loading...</h4>
   }
    if(props.rechargesList.length == 0) {
     return <h3 className="container">Votre historique de recharge est encore vide</h3>
   } 

    
    return (
        <div >
            <table className="table table-hover container">
               <thead>
                 <tr>
                   <th scope="col"></th>
                   <th scope="col">Identifiant recharge</th>
                   <th scope="col">Montant recharge</th>
                 </tr>
               </thead>
               <tbody>
                  {
                    props.rechargesList.map((recharge,index) =>  (
                      
                        <tr key={recharge.numeroRechargeTelephonique}>
                        <th  scope="row"> {index+1} </th>
                        <td> {recharge.numeroRechargeTelephonique} </td>
                        <td>{recharge.montant} </td>
                        
                        
                        </tr> 
                    ) )
                  }
               
            </tbody> 
          </table>

          
        </div>
    )
}

export default HistoRechargeTable
