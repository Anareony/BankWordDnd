import React from "react"
import styled from "styled-components"

const Border = styled.div`
    border-radius: 88px;
    background: linear-gradient(135deg, #FFF 0%, #F2F2F2 100%);
    box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.20), -2px -4px 8px 0px #FFF;
    width: 470px;
    height: 68px;
    flex-shrink: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
`

type IButton = {
    children: string;
    onClick: () => void,
}

const Button: React.FC<IButton> = (props) => {
    
    return (
        <Border {...props}>
            {props.children}
        </Border>
    )
}

export default Button