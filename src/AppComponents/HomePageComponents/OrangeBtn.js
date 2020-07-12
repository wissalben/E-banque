import React from 'react'
import "./orangeBtn.css"
function OrangeBtn(props) {
    return (
        <div>
            <div className="btn orange-btn">{props.text}</div>
            
        </div>
    )
}

export default OrangeBtn
