import React,{ useState } from "react"
import styled from "styled-components"
import { Droppable } from "@hello-pangea/dnd";
import Word from "../../atoms/word/word";


const Border = styled.div`
    display: flex;
    width: 482px;
    height: 90px;
    position: relative;
    word-break: break-all;
    flex-flow: wrap;
    margin-bottom: 50px;
    margin-top: 50px;
`

const Line = styled.div`
    position: absolute;
    height: 1px;
    width:100%;
    background-color: black;
    
    &:nth-child(1) {
        top: 0%
    }
    &:nth-child(1) {
        top: 50%
    }
    &:nth-child(3) {
        top: 100%
    }
`

const WordBackground = styled.div`
    width: 70px;
    height: 30px;
    border-radius: 13px;
    background-color: #E6E6E6; 
    position: absolute;
    z-index: 0;
    margin: 6px;
`

type IDrop = {
    items: IWord[];
    id: string;
    isTranslate:any
}

type IWord = {
    id: string;
    name: string;
}

const Drop: React.FC<IDrop> = ({ items,id, isTranslate }) => {

    return (
        <Droppable droppableId={id} type='group' direction="horizontal">
            {(provided) => (
                <Border ref={provided.innerRef} {...provided.droppableProps}  >
                {isTranslate && <>
                    <Line/>
                    <Line/>
                    <Line/>
                </>}
                {items.map(({id,name}:IWord, index) => (
                    <Word id={id} key={index} index={index}>{name}</Word>
                ))}
                {provided.placeholder}
                </Border>
                )}
        </Droppable>
    )
}

export default Drop