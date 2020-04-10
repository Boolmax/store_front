import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import api from '../../services/store_api';
import './styles.css'


export default function Register() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const history = useHistory();

    async function registerProduct(e){
        e.preventDefault();

        const data = {
            name,
            description,
            price,
            quantity
        };

        try{
            const response = await api.post('/products', data);
            history.push(`/product/${response.data._id}`);
        }
        catch(error){
            console.log(error);
        }
        
    };

    return (
            <form className="form-register" onSubmit={registerProduct}>
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
