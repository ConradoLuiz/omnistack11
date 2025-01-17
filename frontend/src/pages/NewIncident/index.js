import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        } catch{
            alert('Erro na operação de cadastrar o caso');
        }
        
    }
    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to='/profile' className='back-link'>
                        <FiArrowLeft size={18} color="#e02041"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Título do caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder='Descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button type='submit' className='button' >Cadastrar</button>
                </form>
            </div>
        </div>
    )
}