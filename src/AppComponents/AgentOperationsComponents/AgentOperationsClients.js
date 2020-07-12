import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import iconClaire from '../images/icon-agent-client-claire.PNG'
import iconFonce from '../images/icon-agent-client-fonce.PNG'
import './AgentOperationsClients.css'
import Title from '../AgentComponents/Title'
function AgentOperationsClients(props) {
  const link1 = `/agent/${props.match.params.agent_id}/operations-clients/enroller-client`
  const link2 = `/agent/${props.match.params.agent_id}/operations-clients/resilier-client`
  const link3 = `/agent/${props.match.params.agent_id}/operations-clients/activer-client`
  const link4 = `/agent/${props.match.params.agent_id}/operations-clients/suspendre-client`
  const link5 = `/agent/${props.match.params.agent_id}/operations-clients/consulter-mes-clients`
  const link6 = `/agent/${props.match.params.agent_id}/operations-clients/consulter-un-client`
  const link7 = `/agent/${props.match.params.agent_id}/operations-clients/consulter-comptes-client`
  const link8 = `/agent/${props.match.params.agent_id}/operations-clients/modifier-mot-de-passe`
   
  useEffect(() => {
    document.title = 'Operations Clients'
  },[])
  
  
    return (
        <div className="agent-op-clients container">
            <Title text="Operations sur les clients"/><br/><br/>
            <div className="row">
                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link1} style={{ textDecoration: 'none', color:'#000' }}> <p>Enroller un nouveau client</p> </Link>       
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link2} style={{ textDecoration: 'none', color:'#000' }}> <p>Resilier client</p>  </Link>
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link3} style={{ textDecoration: 'none', color:'#000' }}> <p>Activer client </p> </Link>   
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link4} style={{ textDecoration: 'none', color:'#000' }}> <p>Suspendre client</p> </Link>   
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link5} style={{ textDecoration: 'none', color:'#000' }}> <p>Consulter mes clients</p></Link>
                 </div>
                </div>
                </div>
                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link6} style={{ textDecoration: 'none', color:'#000' }}><p>consulter un certain client</p> </Link>    
                 </div>
                </div>
  
                </div>

                <div className="col-md-4 media-cont">
                <div className="media p-3 claire">
                  <img src={iconClaire}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link7} style={{ textDecoration: 'none', color:'#000' }}><p>consulter comptes client</p> </Link>    
                 </div>
                </div>
  
                </div>

                <div className="col-md-4 media-cont">
                <div className="media p-3 fonce">
                  <img src={iconFonce}  className="mr-3 mt-3 rounded-circle" style={{width: "60px"}}/>
                  <div className="media-body">
                    
                  <Link to={link8} style={{ textDecoration: 'none', color:'#000' }}><p>Modifier mot de passe</p> </Link>    
                 </div>
                </div>
  
                </div>

                
                

                

            </div>
        
       </div>

            
       
    )
}

export default AgentOperationsClients
