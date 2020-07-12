import React from 'react'
import SectionOne from './SectionOne'
import Title from './Title'
import Priorites from './Priorites'
import CommentMarche from './CommentMarche'
import Footer from './Footer'

function Home() {
  React.useEffect(() => {
    document.title = 'Acceuil'
    
  })
    return (
        <div className="home-container">
          <SectionOne/>
          <Title text="Nos priorités"/>
          <Priorites/>
          <CommentMarche/>
          
            
        </div>
    )
}

export default Home
