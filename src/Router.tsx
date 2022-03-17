import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Coin from './routes/Coin'
import Main from './routes/Main'
//ts니까 type정의까지 받아야지 사용이가능할껴

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/:coinId" component={Coin}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;