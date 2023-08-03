import React from "react"
import styled from "styled-components"
import { Draggable } from '@hello-pangea/dnd';

const Border = styled.div`
    border-radius: 13px;
    border: 1px solid #C9C9C9;
    background: #FFF;
    box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 30px;
    flex-shrink: 0;
    margin: 5px;
    cursor: grab;
    margin-top: 5px;
    z-index: 1;
`

type IWords = {
    children: string;
    id: string;
    index: number;
}

const Word: React.FC<IWords> = ({id, children, index}) => {
      
    return (
        <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
            <Border  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>    
                {children}
            </Border>
        )}
        </Draggable>
)}

export default Word