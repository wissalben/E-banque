import React from 'react'

function OperationsTable(props) {
    if(props.loading) {
        return <h4 className="text-center">Loading...</h4>
    }
     if(props.operationsList.length == 0) {
      return <h3 className="container">Votre historique d'operations est encore vide</h3>
    } 
 
     
     return (
         <div >
             <table className="table table-hover container">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Identifiant operation</th>
                    <th scope="col">Type d'operation</th>
                    <th scope="col">date d'operation</th>
                    <th scope="col">montant</th>
                    <th scope="col">compte destinations</th>
                  </tr>
                </thead>
                <tbody>
                   {
                     props.operationsList.map((operation,index) =>  (
                       
                         <tr key={index}>
                         <th  scope="row"> {index+1} </th>
                         <td> {operation.numeroOperation ? operation.numeroOperation: '-' } </td>
                         <td> {operation.typeOp ? operation.typeOp: '-' } </td>
                         <td> {operation.dateOperation ? operation.dateOperation.slice(0,10): '-' } </td>
                         <td> {operation.montant ? operation.montant: '-' } </td>
                         <td> {operation.codeCompteDestinataire ? operation.codeCompteDestinataire: '-' } </td>
                         
                         </tr> 
                     ) )
                   }
                
             </tbody> 
           </table>
 
           
         </div>
     )
}

export default OperationsTable
