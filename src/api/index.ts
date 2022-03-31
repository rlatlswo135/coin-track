const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins(){
    return await (await fetch(`${BASE_URL}/tickers`)).json()
}

export async function fetchCoinInfo(coinId:string){
    return await(await fetch(`${BASE_URL}/coins/${coinId}`)).json()

}

export async function fetchCoinPrice(coinId:string){
    return await(await fetch(`${BASE_URL}/tickers/${coinId}`)).json()
}

export async function fetchCoinHistory(coinId:string){
    const nowDate = Math.trunc(Date.now()/1000)
    //현재date를 m/s로 받아온다, 그래서 1000으로 나눠줫음

    const preDate = nowDate - 60*60*24*7*8 //60초=1분이 60분이있고 =1시간이 24시간이 하루고, 그하루가 7일이다 => 오늘 포함 8일의 data를 받아옴

    return await(await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${preDate}&end=${nowDate}`)).json()
    //api쓰는법은 coinpaprika에 있겟지
    
}