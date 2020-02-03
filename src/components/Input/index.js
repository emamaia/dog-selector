import React from 'react'

function Input(props) {

    function validaCampo(ev) {
        const { value, name } = ev.target

        if (props.required && value.trim() === '') {
            props.mudaEstado(name, value, 'Campo obrigatório')
            return
        }
        props.mudaEstado(name, value)
    }

    return (
        <input
            name={props.name}
            type={props.type}
            className={props.classeInput}
            placeholder={props.placeholder}
            onChange={validaCampo}
        />
    )
}

export default Input