import React from 'react';
import Main from './components/pages/main/main';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: #000;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        background: #F5F5F5;
    }
`

function App() {
  return (
    <div className="App">
      <Main/>
      <GlobalStyle/>
    </div>
  );
}

export default App;
