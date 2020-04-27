import React from 'react'
import './styles.css'

function Label (props: { labelName: string, clicked: (labelName: string) => void, isActive: boolean}) {
    const clickHandler = () => {
        if (props.clicked) {
            return props.clicked(props.labelName)
        }
    }
    return (
        <span className={`label ${props.isActive ? 'active' : ''}`} onClick={clickHandler}>{ props.labelName }</span>
    )
}

export default Label