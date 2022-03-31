import React from 'react';
import styled from 'styled-components';
import video from '../file/main.mp4'
import Coins from '../Component/Coins'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position:static;
`
const MainTop = styled.div`
    display:block;
    height:50vh;
    position: relative;
`
const MainBottom = styled(MainTop)`
        max-width:100vw;
        max-height:50vh;
        padding:0px 50px;
        display:block;
        height:50vh;
`
const VideoWrap = styled.div`
    width:100%;
    height:100%;
    video{
    /* position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index: -100; */
    min-width:100%;
    object-fit: contain;
    }

`
const MtContent = styled.div`
    position: absolute;
    z-index:100;
    padding:5%;
    top:10%;
    h2{
        font-size:8em;
        margin-bottom: 15%;
    }
    span{
        padding-left:3%;
        font-size:2.2em;
        transition: all 0.3s;
        &:hover{
            cursor: pointer;
            text-decoration: underline;
            color:gray;
        }
    }
`

const Main = () => {
    return (
        <Container>
            <MtContent>
                <h2>Coin Trackker</h2>
                <span>Show More</span>
            </MtContent>
            {/* flex로 나누지말고 배경위에 띄우자 (position으로) */}
            <MainTop>
                <VideoWrap>
                    <video autoPlay loop muted>\
                        <source src={video} type="video/mp4"></source>
                    </video>
                </VideoWrap>
            </MainTop>
            <MainBottom>
                <Coins slice={20} isMain={true}/>
            </MainBottom>
        </Container>
    );
};

export default Main;