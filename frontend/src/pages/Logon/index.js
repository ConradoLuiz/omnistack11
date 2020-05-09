import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon(){

    const [id,setId] = useState('');

    const history = useHistory();

    async function handlerLogin(e) {
        e.preventDefault();
        
        try{
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.ong.name);

            history.push('/profile');

        } catch(err){
            alert('Erro na operação de Login.');
        }
        
        
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes"/>

                <form onSubmit={handlerLogin}>
                    <h1>Faça seu logon</h1>

                    <input type="text" placeholder="Sua ID"
                    value={id}
                    onChange={ e => setId(e.target.value.trim())}/>

                    <button type="submit" className='button'>Entrar</button>

                    <Link to="/register">
                        <FiLogIn size={18} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>

    )
}