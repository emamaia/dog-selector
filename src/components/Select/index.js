import React from 'react'

function Select(props){
    return(
        <select onChange={props.onChange} className={props.classeSelect}>{props.children}</select>
    )
}

export default Select