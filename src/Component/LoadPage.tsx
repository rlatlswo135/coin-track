import React from 'react';
import ReactLoading from 'react-loading'
import styled from 'styled-components'

interface Iprops{
    isMain:boolean;
}
const Container = styled.div<{isMain:boolean}>`
    /* width:100vw;
    height:100vh;
    */
    width:${props=>props.isMain?null:'100vw'};
    height:${props=>props.isMain?null:'100vh'};
    display:flex;
    justify-content: center;
    align-items: center;
`

const LoadPage = (props:Iprops) => {
    return (
        <Container isMain={props.isMain}>
            <ReactLoading type={'spin'} color={'white'} width={130} height={130}></ReactLoading>
        </Container>
 );
};
export default LoadPage;