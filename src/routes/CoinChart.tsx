import React from 'react';
import {useQuery} from 'react-query'
import { fetchCoinHistory } from '../api';
import Chart from 'react-apexcharts'
import styled from 'styled-components'

const Container = styled.div`
    color:${props=>props.theme.textColor};
    width:100%;
    max-width:69.7vw;
    height:100%;
    max-height:75%;
    position: static;
`

interface ChartProps{
    coinId:string;
}
interface IHistoryData{
close: number
high:number
low:number 
market_cap:number 
open:number 
time_close:string
time_open:string
volume:number 
}

interface ISeries {
    data:any
}
const CoinChart = (props:ChartProps) => {
    const {isLoading,data} = useQuery<IHistoryData[]>(`ohlcv-${props.coinId}`,()=>fetchCoinHistory(props.coinId))
    // let series:ISeries[] = [{
    //     data: [
    //         //time , 시가 고가 저가 종가(open high low close)
    //       [1538856000000, [6593.34, 6600, 6582.63, 6600]], 
    //       [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]]
    //     ]
    //   }]
    
    let series:ISeries[] = [{
        data:[]
    }]
    function inputData(array:IHistoryData[]=[]){
        if(array.length !== 0){
            data?.forEach(price => {
                let {open,high,low,close} = price
                let fixedArray = [open,high,low,close].map(item => item.toFixed(2))
                let divi = price.time_open.split('-')
                let dateArray = divi.map((item,index) => {
                    if(index === divi.length-1){
                        return Number(item.slice(0,2))
                    }else{
                        return Number(item)
                    }
                })
                const date = new Date(dateArray[0],dateArray[1],dateArray[2])
                const timeStamp =date.getTime()
                const Month = Intl.DateTimeFormat('en-US',{month:'long'}).format(date).slice(0,3)
                series[0].data.push({
                    x:`${Month}' ${date.getDate()}`,
                    y:[...fixedArray]
                })
                // series[0].data.push([timeStamp,...fixedArray])
            })
        }
    }
    inputData(data)

    return (
        <Container>
              <Chart series={series} width="100%" height="100%" type="candlestick" options={
                  {
                      theme:{
                          mode:'dark'
                      },
                      plotOptions:{
                          candlestick:{
                              wick:{
                                  useFillColor:true
                              }
                          }
                      },
                      chart:{
                          background:`#353b48`
                      },
                      xaxis:{
                          tickPlacement:'between',
                          tickAmount:6,
                          labels:{
                              rotate:0,
                              style:{
                                  fontSize:'15px'
                              }
                          }
                      },
                      yaxis:{
                          logBase:1000,
                          forceNiceScale:true,
                          labels:{
                              rotate:-15,
                              style:{
                                  fontSize:'15px'
                              },
                              formatter:function(val,index){
                                  return val.toFixed(0)
                              }
                          }
                      }
                  }
              }
  />
        </Container>
    );
};

export default CoinChart;