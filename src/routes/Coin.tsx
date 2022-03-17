import React from 'react';
import {useParams} from 'react-router-dom'

interface RouteParams{
    coinId:string
}
const Coin = () => {
    const {coinId} = useParams<RouteParams>();
    // const {coinId} = useParams<{coinId:string}>(); 같다. useParams가 뱉는 obj의 타입이 정해져잇지않기때문에 오류, 함수가 뱉어내는 타입은<>로 정해주자.
    console.log(coinId)
    return (
        <div>
            <h1>Coin:{coinId}</h1>
        </div>
    );
};

export default Coin;