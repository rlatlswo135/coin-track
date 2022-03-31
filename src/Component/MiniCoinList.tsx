import React,{useState} from 'react';
import {PriceData} from '../routes/Coin'
import styled from 'styled-components'
import { underline } from 'colors';
import {Link} from 'react-router-dom'

interface IProps{
    coinList:PriceData[],
    current:string
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
    border:1px solid green;
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
const LinkStyle = styled(Link)`
    text-decoration: 'none';
`
const MiniCoinList = (props:IProps) => {
    const pagingUnit = 17
    const [sliceNum,setSliceNum] = useState(0)
    const [pageList , setPageList] = useState([1,2,3,4,5])
    const {coinList} = props
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
        }
    }

    return (
        <div>
            {coinList.slice(sliceNum,sliceNum+pagingUnit).map(coin => {
            let divi = String(coin.quotes.USD.percent_change_15m).includes('-')
                return(
                    <Link to={{
                        pathname:`/${coin.id}/chart`,
                        state:{
                            name:coin.name,
                            img:`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`,
                            alldata:coinList
                        },
                    }} style={{ textDecoration: 'none'}}>
                    <List active={coin.name === props.current ? 'true' : 'false'}>
                        <Title>
                            <Img src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`} />
                            <Name>{coin.name}</Name>
                        </Title>
                        <Content>
                            <Price color={divi?`#2E8BC0`:'#FF6B6B'}>{coin.quotes.USD.price.toFixed(2)}<span>USD</span></Price>
                            <Price color={divi?`#2E8BC0`:'#FF6B6B'}>{coin.quotes.USD.percent_change_15m.toFixed(2)}%</Price>
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

// divi?`#2E8BC0`:'#FF6B6B'

//이름 현재가격 플러스마이너스

// `https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`