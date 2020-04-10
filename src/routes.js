import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product/index';
import Register from './pages/product/register';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/products' component={Main} />
            <Route exact path='/product/:id' component={Product} />
            <Route exact path='/products/new' component={Register} />
        </Switch>
    </BrowserRouter>
);

export default Routes;