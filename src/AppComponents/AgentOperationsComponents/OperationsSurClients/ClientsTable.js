import React, {useEffect} from 'react'
import "./ClientsTable.css"

function ClientsTable(props) {
   

    if(props.loading) {
        return <h4 className="text-center">Loading...</h4>
    }
     if(props.clientsList.length == 0) {
      return <h3 className="container">Votre liste de client est encore vide</h3>
    } 

     return (
         <div >
             <table className="table table-hover container">
                <thead>
                  <tr>
                    <th scope="col">Id client</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">CIN</th>
                    <th scope="col">Pseudo</th>
                    <th scope="col">Active</th>
                    <th scope="col">Date Naissance</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Fonction</th>
                    <th scope="col">Status social</th>
                  </tr>
                </thead>
                <tbody>
                   {
                     props.clientsList.map((client,index) =>  (
                       
                         <tr key={index}>
                         <th  scope="row"> {client.numeroClient} </th>
                         <td> {client.nom ? client.nom : '-' } </td>
                         <td> {client.prenom ? client.prenom: '-' } </td>
                         <td> {client.cni ? client.cni: '-' } </td>
                         <td> {client.nomUtilisateur ? client.nomUtilisateur: '-' } </td>
                         <td> {client.active ? 'oui': 'non' } </td>
                         <td> {client.dateNaissance ? client.dateNaissance.slice(0,10): '-' } </td>
                         <td> {client.adresse ? client.adresse: '-' } </td>
                         <td> {client.fonction ? client.fonction: '-' } </td>
                         <td> {client.statusSocial ? client.statusSocial: '-' } </td>
                         
                         </tr> 
                     ) )
                   }
                
             </tbody> 
           </table>
 
           
         </div>
     )

}

export default ClientsTable
