import React, { Component } from 'react';
import api from '../../services/store_api';
import './styles.css';

export default class Main extends Component{
    state = {
        products: [],
        prodInfos: {},
        page: 1,
    };
    
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) =>{
        const res = await api.get(`/products?page=${page}`);

        const { docs, ...prodInfos} = res.data;

        this.setState({products: docs, prodInfos, page});
    };

    prevPage = () => {
        const { page, prodInfos} = this.state;

        if(page === 1) return;

        prodInfos.page--;

        this.loadProducts(prodInfos.page);
    };

    nextPage = () => {
        const { page, prodInfos} = this.state;

        if(page === prodInfos.pages) return;

        prodInfos.page++;

        this.loadProducts(prodInfos.page);
    };

    render(){
        const { page, prodInfos} = this.state;
        return (
          <div className='product-list'>
              {this.state.products.map(prod => (
                  <article key={prod._id}>
                      <strong>{prod.name}</strong>
                      <p>R$ {prod.price}</p>
                      <p>Quantidade em estoque: {prod.quantity}</p>
                  </article>
              ))}
              <div className="navigation">
                  <button disabled={page === 1} onClick={ this.prevPage } id='prevPage'>voltar</button>
                  <button disabled={page === prodInfos.pages} onClick={ this.nextPage } id='nextPage'>próxima</button>
              </div>
          </div>  
        )
    }
}