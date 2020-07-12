import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import iconClaire from '../images/icon-agent-client-claire.PNG'
import iconFonce from '../images/icon-agent-client-fonce.PNG'
import './AgentOperationsClients.css'
import Title from '../AgentComponents/Title'

function AgentOperationsComptes(props) {
  const link1 = `/agent/${props.match.params.agent_id}/operations-comptes/creer-compte-courant`
  const link2 = `/agent/${props.match.params.agent_id}/operations-comptes/creer-compte-epargne`
  const link3 = `/agent/${props.match.params.agent_id}/operations-comptes/supprimer-compte`
  const link4 = `/agent/${props.match.params.agent_id}/operations-comptes/verser`
  const link5 = `/agent/${props.match.params.agent_id}/operations-comptes/retirer`
  const link6 = `/agent/${props.match.params.agent_id}/operations-comptes/consulter-compte`
  const link7 = `/agent/${props.match.params.agent_id}/operations-comptes/consulter-operations-compte`
  const link8 = `/agent/${props.match.params.agent_id}/operations-comptes/activer-compte`
  const link9 = `/agent/${props.match.params.agent_id}/operations-comptes/suspendre-compte`
 
  useEffect(() => {
    document.title = 'Operations Comptes'
  },[])
  
   return (
        <div className="agent-op-comptes container">
            <Title text="Operations sur les comptes"/><br/><br/>
            <div className="row">
                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link1} style={{ textDecoration: 'none', color:'#000' }}>   <p>Creer compte courant</p> </Link>    
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link2} style={{ textDecoration: 'none', color:'#000' }}><p>Creer compte epargne</p> </Link>    
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link3} style={{ textDecoration: 'none', color:'#000' }}><p>Supprimer compte</p> </Link>   
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link4} style={{ textDecoration: 'none', color:'#000' }}><p>Effectuer versement</p></Link>    
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link5} style={{ textDecoration: 'none', color:'#000' }}><p>Effectuer retrait</p> </Link>     
                 </div>
                </div>
                </div>

                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link6} style={{ textDecoration: 'none', color:'#000' }}><p>Consulter un compte</p> </Link>    
                 </div>
                </div>
                </div>

                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link7} style={{ textDecoration: 'none', color:'#000' }}><p>Consulter operations compte</p> </Link>      
                 </div>
                </div>
                </div>

                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link8} style={{ textDecoration: 'none', color:'#000' }}><p>Activer un compte</p> </Link>      
                 </div>
                </div>
                </div>

                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link9} style={{ textDecoration: 'none', color:'#000' }}><p>Suspendre un compte</p> </Link>      
                 </div>
                </div>
                </div>
                
            </div>
        
       </div>

            
       
    )
}

export default AgentOperationsComptes
