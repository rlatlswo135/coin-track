import React, { useEffect,useState } from 'react';
import {useHistory,useParams,useLocation,Switch,Route,Link,useRouteMatch} from 'react-router-dom'
import Price from '../routes/Price'
import CoinChart from '../routes/CoinChart'
import {useQuery} from 'react-query'
import MiniCoinList from '../Component/MiniCoinList'
import { fetchCoinInfo, fetchCoinPrice } from '../api';
import styled from 'styled-components'
import LoadPage from '../Component/LoadPage'

interface RouteParams{
    coinId:string
}

interface InfoData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    first_data_at:string;
    last_data_at:string;
}
export interface PriceData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{
            ath_date: string
            ath_price:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
        }
    };
}
interface LinkState{
    name:string,
    img:string,
    alldata:PriceData[]
}
interface IColorData{
    color:string
}

const Nav = styled.div`
    display:flex;
    justify-content: center;
    padding:1% 3%;
    h4{
        font-size:1.5em;
        font-weight: 700;
        transition: all 0.2s;
    }
    h4:hover{
        cursor:pointer;
        color:${props => props.theme.accentColor};
    }
`
const Container = styled.div`
    display:flex;
    padding:0% 1%;
    margin-top:1%;
    height:90vh;
    `
const ContentLeft = styled.div`
    width:75vw;
    height:100%;
    padding:0% 1%;
    border-right:1px solid rgba(0,0,0,0.2);
`
const LeftTitle =  styled.h1`
    padding:1%;
    border-bottom:1px solid rgba(0,0,0,0.2);
    font-size:4em;
    img{
        width:5%;
    }
    span{
        margin-left:10px;
        font-weight: 600;
        letter-spacing: 5px;
    }
`
const LeftPrice = styled.div`
    padding:1%;
    h2{
        color:${props=>props.color};
        font-weight: bold;
        span{
            font-size:0.6em;
        }
    }
    h4{
        font-size:1em;
        color:rgba(255,255,255,0.4);
        span{
            padding-left:10px;
            font-size:1.4em;
            color:${props => props.color}
        }
    }
`
const ContentRight = styled.div`
    width:25vw;
    padding:1% 1%;
`
const RightTitle  = styled.h1`
    text-align: right;
    padding-bottom: 4%;
    letter-spacing: 5px;
`
const Coin = () => {
    let history = useHistory()
    const {state} = useLocation<LinkState>()
    const {coinId} = useParams<RouteParams>();
    const priceMatch = useRouteMatch("/:coinId/price")
    const chartMatch = useRouteMatch("/:coinId/chart")
    // 첫번째인자가 고유key이니 구분위해 저렇게넣어준거같은데.. 글쎄?
    console.log(state)
    const {isLoading:priceLoading,data:priceData} = useQuery<PriceData>(`price-${coinId}`,()=>fetchCoinPrice(coinId))
    let divi = String(priceData?.quotes.USD.percent_change_15m).includes('-')
    return (
        <div>
            {
                priceLoading
                ?
                <LoadPage isMain={false}/>
                :
                <>
                <Nav>
                    <h4 onClick={()=>history.push('/')}>Coin Tracker</h4>
                </Nav>
                <Container>
                    <ContentLeft>
                        <LeftTitle>
                            <img src={state.img}></img>
                            <span>{state.name}</span>
                        </LeftTitle>
                        <LeftPrice color={divi?`#2E8BC0`:'#FF6B6B'}>
                            <h2>{`${priceData?.quotes.USD.price.toFixed(2)} `}
                                <span>USD</span>
                            </h2>
                            <h4>전일대비   
                                <span>{` ${priceData?.quotes.USD.percent_change_15m.toFixed(2)}%`}</span>
                            </h4>
                        </LeftPrice>
                        <CoinChart coinId={coinId} />
                    </ContentLeft>
                    <ContentRight>
                        <RightTitle>Coin List</RightTitle>
                        <MiniCoinList coinList={state.alldata} current={state.name}></MiniCoinList>
                    </ContentRight>
                </Container>
                <Switch>
                    <Route path={`/${coinId}/price`}></Route>
                </Switch>
                </>
            }
        </div>
    );
};

export default Coin;