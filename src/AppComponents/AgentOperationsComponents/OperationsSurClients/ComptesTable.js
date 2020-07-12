import React from 'react'

function ComptesTable(props) {
    if(props.loading) {
        return <h4 className="text-center">Loading...</h4>
    }
    
     if(props.comptesList.length == 0) {
      return <h3 className="container">Votre liste de client est encore vide</h3>
    } 
 
     
     return (
         <div >
             <table className="table table-hover container">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Actif</th>
                    <th scope="col">Code compte</th>
                    <th scope="col">Date creation</th>
                    <th scope="col">Type compte</th>
                    <th scope="col">Pin</th>
                    <th scope="col">Solde</th>

                    
                  </tr>
                </thead>
                <tbody>
                   { 
                     props.comptesList.map((compte,index) =>  (
                        
                         <tr key={index}>
                         <th  scope="row"> {index+1} </th>
                         <td> {compte.actif ? 'oui' : 'non' } </td>
                         <td> {compte.codeCompte ? compte.codeCompte: '-' } </td>
                         <td> {compte.dateCreation ? compte.dateCreation.slice(0,10): '-' } </td>
                         <td> {compte.decouvert ? 'courant': 'epargne' } </td>
                         <td> {compte.pin ? compte.pin: '-' } </td>
                         <td> {compte.solde ? compte.solde: '-' } </td>
                         
                         </tr> 
                     ) )
                   }
                
             </tbody> 
           </table>
 
           
         </div>
     )
}

export default ComptesTable
