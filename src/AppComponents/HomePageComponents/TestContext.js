import React,{useContext} from 'react'
import {UserContext} from '../../UserContext'
function TestContext() {
    const {state,setState} = useContext(UserContext) ;

    //console.log("valeur : ",val);
    return (
        <div>
           <p> OUIIIIIIIIIIII </p>
           <p>{state? state : 'error'}</p>
           <button onClick={()=>setState('heyyy')}>click</button>
        </div>
    )
}

export default TestContext
