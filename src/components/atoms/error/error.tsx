import React from "react"
import styled from "styled-components"

const StyledWord = styled.div`
    color: red;
    text-decoration:underline
    padding-bottom: 2px;
    margin-bottom: 20px;
    color: #F00;
    text-shadow: 1px 2px 2px 0px rgba(91, 13, 13, 0.50), -1px -2px 2px 0px #FFF;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

type IError = {
    children: string;
}

const Error: React.FC<IError> = ({children}) => {
    
    return (
        <StyledWord>{children}</StyledWord>

)}

export default Error