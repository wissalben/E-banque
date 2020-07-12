import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthUserInfos} from '../AuthUserInfos' // AuthUserInfos is a context 

function PrivateRoute({component: Component, ...rest}) {

   const {user, dispatch} =React.useContext(AuthUserInfos) ;
   const [isAuthent, setIsAuthent] = React.useState(false);

    return (
    <Route {...rest} render={(props) => (
        user.isAuth == true ? 
         (<Component {...props}/>) : (<Redirect to='/authentification'/>)
        ) }/>
    )
}

export default PrivateRoute
