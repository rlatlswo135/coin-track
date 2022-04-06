import React,{useState} from 'react';
import {PriceData} from '../routes/Coin'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {fetchCoins} from '../api'
import {useQuery} from 'react-query'
import { useEffect } from 'react';


interface IProps{
    current:string,
    sliceNum:any
}

const List = styled.div<{active:string}>`
    display:flex;
    border:${props => props.active === 'true'? '2px solid rgba(255,255,255,0.3)' : null};
    padding:2%;
    justify-content: space-between;
    width:100%;
    align-items: center;
`
const Img = styled.img`
    width:30px;
    height: 30px;
`
const Name = styled.div`
    font-size:1.2em;
    text-align: left;
    font-weight: 500;
    padding-left: 5%;
    width:100%;
`
const Price = styled.div`
    color:${props => props.color};
    font-size:1.4em;
    font-weight: 400;
    span{
        padding-left:5%;
        font-size:0.7em;
    }
`
const Title = styled.div`
    display:flex;
    flex:1;
`
const Content = styled.div`
    display:flex;
    flex:1.2;
    justify-content: space-between;
    padding:0% 1%;
`
const Page = styled.div`
    display:flex;
    justify-content:center;
    margin-top:5%;
    ul{
        display:flex;
        margin:0;
        padding:0;
        list-style:none;
    }
`

const PageList = styled.li`
    font-size:1.5em;
    margin:0 10px;
    transition: all 0.2s;
    color:${props => props.color === 'active' ? props.theme.accentColor : 'whitesmoke'};
    text-decoration: ${props => props.color==='active' ? 'underline' : 'none'};
    &:hover{
        cursor: pointer;
        color:${props => props.theme.accentColor}
    }
`

const MiniCoinList = (props:IProps) => {
    const {isLoading,data:coinsData} = useQuery<PriceData[]>('allPrice',fetchCoins,{
        refetchInterval:1000,
        refetchIntervalInBackground:true,
    })
    const pagingUnit = 17
    const [currentPage , setCurrentPage] = useState(1)
    const [sliceNum,setSliceNum] = useState(0)
    const [pageList , setPageList] = useState([1,2,3,4,5])
    function pageFun(eve:React.MouseEvent<HTMLLIElement>){
        //ts문제란다 eve.target을 HTML엘리먼트로 캐스팅해서쓴다는데;
        const casting = eve.target as HTMLElement
        if(casting.innerText === '<<'){
            let copyPageList = [...pageList]
            let map = copyPageList.map(item => item-5)
            if(copyPageList[0] !== 1){
                setPageList(map)
                setSliceNum((map[0]-1)*pagingUnit)
            }
        }else if(casting.innerText === '>>'){
            let copyPageList = [...pageList]
            let map = copyPageList.map(item => item+5)
            setPageList(map)
            setSliceNum((map[0]-1)*pagingUnit)
        }else{
            let pageNum = Number(casting.innerText) -1
            setSliceNum(pageNum*pagingUnit)
            setCurrentPage(pageNum + 1)
        }
    }
    
    return (
        <div>
            {coinsData?.slice(sliceNum,sliceNum+pagingUnit).map(coin => {
            let color = String(coin?.quotes.USD.percent_change_15m).includes('-') ? '#2E8BC0' : '#FF6B6B'
            if(coin?.quotes.USD.percent_change_15m === 0){
                color='white'
            }
                return(
                    <Link to={{
                        pathname:`/${coin.id}/chart`,
                        state:{
                            name:coin.name,
                            img:`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`,
                            sliceNum
                        },
                    }} style={{ textDecoration: 'none'}}>
                    <List active={coin.name === props.current ? 'true' : 'false'}>
                        <Title>
                            <Img src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`} />
                            <Name>{coin.name}</Name>
                        </Title>
                        <Content>
                            <Price color={color}>{coin.quotes.USD.price.toFixed(2)}<span>USD</span></Price>
                            <Price color={color}>{coin.quotes.USD.percent_change_15m.toFixed(2)}%</Price>
                        </Content>
                    </List>
                    </Link>
                )
            })}
            <Page>
                <ul>
                    <PageList onClick={(e)=>pageFun(e)}>{'<<'}</PageList>
                    {pageList.map(item => {
                        let divi = (sliceNum/pagingUnit)+1
                        return(
                            <PageList color={divi === Number(item)?'active':'none'} onClick={(e)=>pageFun(e)}>{item}</PageList>
                        )
                    })}
                    <PageList onClick={(e)=>pageFun(e)}>{'>>'}</PageList>
                </ul>
            </Page>
        </div>
    );
};

export default MiniCoinList;

