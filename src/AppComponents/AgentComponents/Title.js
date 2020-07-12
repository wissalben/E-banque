import React from 'react'
import './Title.css'
function Title(props) {
    return (
        <div className="title-container">
            <h3 className="title-text text-center">{props.text}</h3>
            
        </div>
    )
}

export default Title
