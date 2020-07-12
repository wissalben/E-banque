import React,{useState,useContext,useEffect,useReducer} from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import './App.css';
import NavBar from './AppComponents/HomePageComponents/NavBar'
import Footer from './AppComponents/HomePageComponents/Footer'
import Home from './AppComponents/HomePageComponents/Home'
import Guide from './AppComponents/Guide'
import Contact from './AppComponents/Contact'
import AuthForm from './AppComponents/AuthForm'
import PrivateRoute from './AppComponents/PrivateRoute'
import {AuthUserInfos} from './AuthUserInfos'
import ClientAcceuil from './AppComponents/ClientPages/ClientAcceuil';
import ClientNav from './/AppComponents/ClientPages/ClientNav'
import ErrorPage from './AppComponents/ErrorPage'
import ClientInfos from './AppComponents/ClientPages/ClientInfos'
import Compte from './AppComponents/ClientPages/Compte'
import Virement from './AppComponents/ClientPages/Virement'
import Recharge from './AppComponents/ClientPages/Recharge'
import HistoriqueOperations from './AppComponents/ClientPages/HistoriqueOperations'
import HistoriqueRecharges from './AppComponents/ClientPages/HistoriqueRecharges'
const initialState = {
  isAuth:false,
  userInformations:{},
  token:{},
  comptes:[]
}
const reducer = (state, action) => {
switch(action.type){
  case 'userIsAuthentificated' : 
    return {
      isAuth:true,
      userInformations:{...action.payload},
      token:{...action.token},
      comptes:[]
    }
   case 'userSignedOut' :
     return {
       isAuth:false,
       userInformations:{},
       token:{},
       comptes:[]
       
     } 
     case 'Accout-Infos' :
      return {
       ...state, 
        comptes:[...action.Comptes]
        
      } 


    default :
    return state
}
}


function App() {
  
  const [user,dispatch] = useReducer(reducer, initialState) ;
  
  /*useEffect(() => {
    const data = localStorage.getItem('user-infos');
    if(data) {
      let str  =JSON.parse(data) ;
      dispatch({type:'userIsAuthentificated',payload:{...str.userInformations},token:{...str.token}})
    }
    console.log("from local storage ",user);
  }, []) 

  useEffect(() => {
    localStorage.setItem('user-infos',JSON.stringify(user) )
   }) */
   
   /*useEffect(() => {console.log("from app comp : ",user)});*/
  return (
  
    <BrowserRouter>

    <div className="App">
    <AuthUserInfos.Provider value={{user,dispatch}}>
     {user.isAuth ? <ClientNav/> : <NavBar/> }     
     {/*<AuthUserInfos.Provider value={{user,dispatch}}>*/}
      <Switch>
        
     <Route  path='/' component={Home} exact/>
     <Route path='/guide' component={Guide} exact/>
     <Route path='/contact' component={Contact} exact/>
     <Route path='/authentification' component={AuthForm} exact/>
     <PrivateRoute path='/client/:client_id' component={ClientAcceuil} exact/>
     <PrivateRoute path='/client/:client_id/infos' component={ClientInfos} exact/>
     <PrivateRoute path='/client/:client_id/compte/:compte_id' component={Compte} exact/>
     <PrivateRoute path='/client/:client_id/compte/:compte_id/virement' component={Virement} exact/>
     <PrivateRoute path='/client/:client_id/compte/:compte_id/recharge' component={Recharge} exact/>
     <PrivateRoute path='/client/:client_id/compte/:compte_id/historique-operations' component={HistoriqueOperations} exact/>
     <PrivateRoute path='/client/:client_id/compte/:compte_id/historique-recharges' component={HistoriqueRecharges} exact/>
     <Route component={ErrorPage} />
     </Switch>
     </AuthUserInfos.Provider>
    
     <Footer/>
     
   
 
    </div>
    </BrowserRouter>
  );
  
}

export default App;
