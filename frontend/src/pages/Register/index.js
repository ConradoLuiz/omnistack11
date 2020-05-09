import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try{
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.meta.id}`);

            history.push('/');
            
        } catch{
            alert('Erro no cadastro. Tente novamente mais tarde.');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e cadastre os casos</p>

                    <Link to='/' className='back-link'>
                        <FiArrowLeft size={18} color="#e02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={ handleRegister }>
                    <input 
                     placeholder='Nome da ONG'
                     value={name}
                     onChange={e => setname(e.target.value)}
                    />

                    <input 
                     placeholder='E-mail'
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                     placeholder='Whatsapp'
                     value={whatsapp}
                     onChange={e => setWhatsapp(e.target.value)}
                    />


                    <div className="input-group">
                        <input 
                         placeholder='Cidade'
                         value={city}
                         onChange={e => setCity(e.target.value)}
                        />

                        <input 
                         placeholder='UF'
                         value={uf}
                         onChange={e => setUf(e.target.value.toUpperCase().slice(0, 2) )}
                        />

                    </div>

                    <button type='submit' className='button' >Cadastrar</button>
                </form>
            </div>
        </div>
    )
}