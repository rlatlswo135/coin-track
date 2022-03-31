import React from 'react';
import logo from './logo.svg';
import Router from './Router'
import './App.css';
import {createGlobalStyle} from 'styled-components'
import {ReactQueryDevtools}  from 'react-query/devtools'

//css초기화의 느낌인데 global적으로 적용할 스타일을 만드는듯. => styled-component안에 내장기능 그걸 전체컴포넌트의 상위로 넣어주면 될듯하다
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
  body{
    margin:0px;
    font-family: 'Source Sans Pro', sans-serif;
    transform: translate(0.02deg);
    background-color: ${props => props.theme.bgColor};
    color:${props=>props.theme.textColor}
  }
  a{
    text-decoration: none;
    color:white;
  }
  div{
    margin: 0px;
    box-sizing: border-box;
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
