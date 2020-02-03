import React from 'react'

function Button(props){
    return(
        <button up onClick={props.handleClick} className={props.classeButton}>{props.children}</button>
    )
}

export default Button