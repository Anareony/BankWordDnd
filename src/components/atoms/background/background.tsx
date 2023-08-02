import React from "react"
import styled from "styled-components"


const Wrapper = styled.div`
  width: 200px;
  height: 400px;
  position: relative;

`

const Line = styled.div`
    position: absolute;
    height: 1px;
    width:200px;
    background-color: black;
    
    &:nth-child(1) {
        top: 0%
    }
    &:nth-child(1) {
        top: 25%
    }
    &:nth-child(3) {
        top: 50%
    }
`
type IBackground = {
    children: any;
    ref:any

}
const Background: React.FC<IBackground> = (props,{children}) => {
      
    return (
        <Wrapper {...props} >
            {children}
                <Line/>
                <Line/>
                <Line/>

        </Wrapper>
)}

export default Background