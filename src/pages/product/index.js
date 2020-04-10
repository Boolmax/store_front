import React, { Component } from 'react';
import api from '../../services/store_api';
import { Link } from 'react-router-dom';

export default class Product extends Component {
    state = {
        product: {},
    }

    async componentDidMount(){
        var {id} = this.props.match.params;
        const response = await api.get(`/products/${id}`);
        this.setState({product: response.data});
    }

    render(){
        const { product } = this.state;
        return(
            <form className="form-register" onSubmit={e => e.preventDefault()}>
                <input required placeholder='Nome' type="text" value={product.name} disabled/>
                <input required placeholder='Descrição' type="text" value={product.description} disabled/>
                <input required placeholder='Preço' type="number" value={product.price} disabled/>
                <input required placeholder='Quantidade' type="text" value={product.quantity} disabled/>
                <Link to="/products">Voltar</Link>
            </form>
        )
    }
};