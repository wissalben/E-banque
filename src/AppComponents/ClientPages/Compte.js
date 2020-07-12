import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthUserInfos} from '../../AuthUserInfos'
import Title from'../HomePageComponents/Title'
import './Compte.css'
function Compte(props) {
    const {user, dispatch} = useContext(AuthUserInfos) ;
    const [codeCompte, setCodeCompte] = useState(undefined);
    const [compteInfos,setCompteInfos] = useState({});

    useEffect(()=>{
        document.title = 'Mon Compte'
        const id = props.match.params.compte_id ;
        setCodeCompte(id);
        user.comptes.forEach((element,index) => {
           
            if(element.codeCompte == id) {
                setCompteInfos(element)
            }

        })

     
    }
    ,[])


    return (
        <div className="compte-container container">
            <Title text="Operations"/>
            <div className="container operation-container">
                <div className="row">
                    <div className="col-md-4 les-operations"><Link  to={`/client/${user.userInformations.numeroClient}/compte/${codeCompte}/virement`}>Effectuer un Virement</Link></div>
                    <div className="col-md-4 les-operations"><Link to={`/client/${user.userInformations.numeroClient}/compte/${codeCompte}/recharge`}>Effectuer une recharge</Link></div>
                </div><br/>
                </div>
                <Title text="Vos historiques"/>
            <div className="container historique-container">
               <div className="row">
                    <div className="col-md-4 historique-operations"><Link  to={`/client/${user.userInformations.numeroClient}/compte/${codeCompte}/historique-operations`}>Historique des operations</Link></div>
                    <div className="col-md-4 historique-recharges"><Link to={`/client/${user.userInformations.numeroClient}/compte/${codeCompte}/historique-recharges`}>Historique des recharges</Link></div>
                </div><br/>
                
             

            

            </div>

        </div>
    )
}

export default Compte
