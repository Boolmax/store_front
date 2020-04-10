import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product/index';
import Register from './pages/product/register';
import Update from './pages/product/update';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/products' component={Main} />
            <Route exact path='/product/:id' component={Product} />
            <Route exact path='/products/new' component={Register} />
            <Route exact path='/product/e/:id' component={Update} />
        </Switch>
    </BrowserRouter>
);

export default Routes;