import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { ReactElement } from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useQuery } from 'react-query';
import { fetchCoins,fetchCoinPrice } from '../api';
import {PriceData} from '../routes/Coin'
import LoadPage from '../Component/LoadPage'

interface ICoins {
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string
}
interface Iprops{
    isMain:boolean,
    slice:number
}

const Container=styled.div`
    width:100%;
    height:100%;
    padding:5% 2%;
`
const Img=styled.img`
    width:25px;
    height:25px;
    margin-right:5px;
`
const Coin = styled.div`
    background-color: #353b48;
    align-items: center;
    display:flex;
    width:100%;
    height:20%;
    justify-content: space-between;
    box-shadow: 0px 8px 24px rgba(149,157,165,0.2);
    padding:15% 5%;
    font-size:1.3em;
    color:whitesmoke;
    border-style:none;
    border-radius: 10px;
    Link{
        display:block;
        transition:color 0.2s ease-in;
        height:100%;
    }
    &:hover{
        a{
            color:${props=>props.theme.accentColor}
        }
    }
`
const CoinLeft = styled.div`
    display:flex;
`
const CoinRight = styled.div`
    display:flex;
    flex-grow:2;
    color:${props=>props.color};
    justify-content: flex-end;
    font-size:0.8em;
    margin-left:20%;
`

function Coins(props:Iprops){
    const {isLoading,data} = useQuery<PriceData[]>('allCoins', fetchCoins)
/*
useEffect시 fetch로 data받아오고, state에 set하고 isLoading도 별도의 state로 관리하던 코드가
react-query 라이브러리를 이용하니 깔끔해졌다. => 자체적으로 isLoading이라는 데이터까지 return함
fetch함수로 받아온 데이터를 별도의 캐시에 저장해서 파괴되지않게하는 기능까지 있나부다. 
redux에 provider처럼 감싸고, 만든 client를 넘겨주고, useQuery라는 훅으로
1번째인자는 고유 아이디, 2번째인자는 fetcher함수를 써서 이용해준다
*/
    return(
        <Container>
            {
                isLoading
                ?
                <LoadPage isMain={props.isMain}/>
                :
                <>
                <Row>
                    {/* 코인을 너무많이받아와서 일단 slice해서 100개만 해놓는데 페이징해서 100개씩 해볼까? */}
                    {data?.slice(0,props.slice).map(coin => {
                        let divi = String(coin.quotes.USD.percent_change_15m).includes('-')
                        return(
                        <Col xl={3} lg={6} key={coin.id}>
                            <Coin>
                                <CoinLeft>
                                    <Img src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`} />
                                    <Link to={{
                                        pathname:`/${coin.id}/chart`,
                                        state:{
                                            name:coin.name,
                                            img:`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`,
                                            alldata:data
                                        }
                                    }}>{coin.name}</Link>
                                </CoinLeft>
                                <CoinRight color={divi?'#2E8BC0':'#FF6B6B'}>
                                    <div>{`${coin.quotes.USD.price.toFixed(2)} USD`}</div>
                                    <div>{`${coin.quotes.USD.percent_change_15m}%`}</div>
                                </CoinRight>
                            </Coin>
                        </Col>
                        )
                    })}
                </Row>
                </>
            }
        </Container>
    )
}


export default Coins