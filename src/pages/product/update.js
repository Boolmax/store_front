import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import api from '../../services/store_api';
import './styles.css'


export default function Update(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const history = useHistory();

    useEffect(()=>{
        async function getProductToEdit(){
            const { data } = await api.get(`products/${props.match.params.id}`);
            if(name === '')
                setName(data.name);
            if(description === '')
                setDescription(data.description);
            if(price === '')
                setPrice(data.price);
            if(quantity === '')
                setQuantity(data.quantity);
        }
        getProductToEdit();
    })

    async function updateProduct(e){
        e.preventDefault();

        const data = {
            name,
            description,
            price,
            quantity
        };

        try{
            const response = await api.put(`/products/${props.match.params.id}`, data);
            history.push(`/product/${response.data._id}`);
        }
        catch(error){
            console.log(error);
        }
        
    };

    return (
        <form className="form-register" onSubmit={updateProduct}>
            <input required placeholder='Nome' type="text" value={name} onChange={e => setName(e.target.value)} />
            <input required placeholder='Descrição' type="text" value={description} onChange={e => setDescription(e.target.value)} />
            <input required placeholder='Preço' type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <input required placeholder='Quantidade' type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <div id='buttons'>
                <button onClick={() => history.push('/products')} type="reset" id="cancel">Cancelar</button>
                <button type="submit">Salvar</button>
            </div>
        </form>
    );
}