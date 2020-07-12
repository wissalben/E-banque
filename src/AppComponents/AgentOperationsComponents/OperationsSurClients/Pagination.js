import React from 'react'
import './Pagination.css'
function Pagination(props) {
    const listPagingation=[] ; // tableau qui nous aide pour savoir le nbr de bouton de pagination
    for(let i=0 ; i< props.nbrePages; i++) {
      listPagingation.push(i);
    }
    if(props.toAppear == 0)  {return null} // si il n ya pas de pages on affiche pas les boutons de paginations
      return (
          <div className="pagination-container"> 
          
          <nav aria-label="Page navigation example">
             <ul className="pagination justify-content-center">
             {
                  listPagingation.map((page,index) => (
                  <li className="page-item"><a className="page-link"  onClick={() => props.clicked(index)}>{index+1}</a></li>
                      ))
                  } 
  
  
             </ul>
           </nav>
              
          </div>
      )
}

export default Pagination
