import React from 'react'
import {AuthUserInfos} from '../../AuthUserInfos'
import Title from '../HomePageComponents/Title'
import './ClientInfos.css'
function ClientInfos() {
    const {user, dispatch} =React.useContext(AuthUserInfos) ;
     const userInfo =user.userInformations ;
     React.useEffect(() => {
        document.title = 'Mes Informations'
        
      })
    return (
        <div>
          <Title text="Mes Informations"/>
        <div className="container client-info-container ">
           
            <p className="client-information"><span className="client-info-label">Nom : </span>{userInfo.nom} </p>
            <p className="client-information"><span className="client-info-label">Prenom : </span>{userInfo.prenom} </p>
            <p className="client-information"><span className="client-info-label">CIN : </span>{userInfo.cni} </p>
            <p className="client-information"><span className="client-info-label">ADRESSE : </span>{userInfo.adresse} </p>
            <p className="client-information"><span className="client-info-label">Fonction : </span>{userInfo.fonction} </p>
            <p className="client-information"><span className="client-info-label">Nb de comptes : </span>{user.comptes.length} </p>
            
        </div>
        </div>
    )
}

export default ClientInfos
