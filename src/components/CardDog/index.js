import React from 'react'

import './style.css'

function CardDog(props){
    return(
        <div>

            <img className='imagem' src={props.imagem} alt='imagem de cachorro'></img>

        </div>
    )
}

export default CardDog