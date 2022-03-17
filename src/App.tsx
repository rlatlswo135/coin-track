import React from 'react';
import logo from './logo.svg';
import Router from './Router'
import './App.css';
import {createGlobalStyle} from 'styled-components'

//css초기화의 느낌인데 global적으로 적용할 스타일을 만드는듯. => styled-component안에 내장기능 그걸 전체컴포넌트의 상위로 넣어주면 될듯하다
const GlobalStyle = createGlobalStyle`
  body{
    color:red;
  }
`

function App() {
  return (
    <>
    <GlobalStyle />
    <Router />
    </>
  );
}

export default App;

/*
/ => main page => 화변반 타이틀/코인정보 살짝
/:id => /btc => coin detail  => nasted /btc/information /btc/chart
*/
