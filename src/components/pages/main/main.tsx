import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/button/button';
import Drop from '../../molecules/droppable/droppable';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Cloud from '../../atoms/cloud/cloud';
import Human from '../../atoms/human/human';
import Error from '../../atoms/error/error';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    
`

const Title = styled.h1`
    color: #252525;
    text-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.25), -2px -4px 3px 0px #FFF;
    font-family: Roboto;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

const Sentence = styled.div`
    position: absolute;
    right: 5px;
    top: 30px;
`


function Main() {
  const [sentence, setSentence] = useState<string>('')
  const [sentenceEn, setSentenceEn] = useState<string>('')
  const [splitSentenceEn, setSplitSentenceEn] = useState<any>([])
  const [chekingSentence, setChekingSentence] = useState<any>([])
  const [ isError,setIsError ] = useState<boolean>(false)
  const msg = new SpeechSynthesisUtterance()
  const url = 'https://academtest.ilink.dev/graphql'

 
  const makeRequest = (query:string) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({query})
    }).then(res => res.json())
  }

  useEffect(() => {
    makeRequest(
      `query {
        sentence {
          en
          ru
        }
      }`
    )
    .then( data => {
      setSentence(data.data.sentence.ru)
      setSentenceEn(data.data.sentence.en)
      setSplitSentenceEn(data.data.sentence.en.split(' ').map((id:number,index:number) => {
        return {
          id: uuidv4(),
          name: data.data.sentence.en.split(' ')[index]
        }
      }))
    })
  }, [])

  const finalArray = (object:any) => object.map(({name}:any) => name);

  const speechHandler = (msg:any) => {
    if(sentenceEn.toString() == finalArray(chekingSentence).join(' ') ) {
      window.speechSynthesis.speak(msg)
      setIsError(false)
      msg.text = sentence
    } else {
      setIsError(true)
    }
  }
  
  const reorder = (list:string[], startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  function handleOnDragEnd(result:DropResult) {
    const { destination, source, draggableId } = result;
  
    if (!destination) {
      return;
    }
  
    function removeItemById(id:string, array:string[]) {
      return array.filter((item:any) => item.id != id);
    }

    if (source.droppableId == '1') {
      setSplitSentenceEn(removeItemById(draggableId, splitSentenceEn));
    } else {
      setChekingSentence(removeItemById(draggableId, chekingSentence));
    }
    
    if (destination.droppableId == '1') {
      const sourceClone = Array.from(chekingSentence);
      const destClone = Array.from(splitSentenceEn);
      const [removed] = sourceClone.splice(source.index, 1);

      destClone.splice(destination.index, 0, removed);

      setSplitSentenceEn(destClone);

    } else {
      const sourceClone = Array.from(splitSentenceEn);
      const destClone = Array.from(chekingSentence);
      const [removed] = sourceClone.splice(source.index, 1);

      destClone.splice(destination.index, 0, removed);

      setChekingSentence(destClone);
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId == '1') {
        const items = reorder(splitSentenceEn, source.index, destination.index);
        setSplitSentenceEn(items)
      } else {
        const items = reorder(chekingSentence, source.index, destination.index);
        setChekingSentence(items)
      }
    } 
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Wrapper>
        <Title>Transtale this sentence</Title>
        <div style={{position:'relative'}}>
          <Human/>
          <Cloud/>
          <Sentence>{sentence}</Sentence>
        </div>
        <Drop items={chekingSentence} id={'0'} isTranslate={true}/> 
        <Drop items={splitSentenceEn} id={'1'} isTranslate={false}/>
        { isError && <Error children={'Something wrong!'}/>}
        <Button onClick={() => speechHandler(msg)}>Check</Button>
      </Wrapper>
    </DragDropContext>
  );  
}

export default Main;
