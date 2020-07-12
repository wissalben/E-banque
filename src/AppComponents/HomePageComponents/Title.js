import React from 'react'
import './Title.css'
function Title(props) {
    return (
        <div className="title-container">
            <h1 className="title-text text-center">{props.text}</h1>
            
        </div>
    )
}

export default Title
