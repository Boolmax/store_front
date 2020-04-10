/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import api from '../../services/store_api';
import './styles.css';
import { Link } from 'react-router-dom';

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

    deleteProduct = async (id) =>{
        await api.delete(`/products/${id}`);
        this.loadProducts();
    }

    render(){
        const { page, prodInfos} = this.state;
        return (
          <div className='product-list'>
              <div className='div-newProduct'>
                  <div></div>
                  <Link to={`/products/new`} id='newProduct'>Novo produto</Link>
              </div>             
              {this.state.products.map(prod => (
                  <article key={prod._id}>
                      <strong>{prod.name}</strong>
                      <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(prod.price)}</p>
                      <p>Quantidade em estoque: {prod.quantity}</p>
                      <div id='vis-del'>
                          <a onClick={() => this.deleteProduct(prod._id)}>Deletar</a>
                          <Link to={`/product/e/${prod._id}`} id='update'>Editar</Link>
                          <Link to={`/product/${prod._id}`}>Visualizar</Link>
                      </div>
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