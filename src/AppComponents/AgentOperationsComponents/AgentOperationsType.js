import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import Title from '../AgentComponents/Title'
import './AgentOperationsType.css'
function AgentOperationsType(props) {
    // /agent/:agent_id/operations-clients
    const link1 = `/agent/${props.match.params.agent_id}/operations-clients` ;
    const link2 = `/agent/${props.match.params.agent_id}/operations-comptes` ;
      useEffect(() => {
        document.title = 'Types Operations'
      },[])
    return (
        <div className="agent-operation-container container"><br/><br/>
            <Title text="Choisissez le type d'operation" /><br/> <br/><br/>
            <div className="container">
                <div className="row text-center">
                <div className="col-md-4 type-des-operations "><Link to={link1} style={{ textDecoration: 'none', color:'#000' }}>Operations sur clients</Link></div>
                <div className="col-md-4 type-des-operations"><Link to={link2} style={{ textDecoration: 'none', color:'#000' }}>Operations sur comptes</Link></div>
               
                </div>

            </div>
            
        </div>
    )
}

export default AgentOperationsType
