import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();


    useEffect( () => {
        if(ongId === null){
            localStorage.clear();
            history.push('/');
        }

        // ************
        // FAZER OUTRA CHAMADA PARA API CONFIRMANDO QUE ESSE ONG ID ESTÁ REGISTRADO NO BANCO
        // ************

        try{
            api.post('sessions', {id: ongId })
            .then( (response) => {
                console.log(response.status);
                if(response.status !== 200){
                    alert('Usuário não logado');
                    localStorage.clear();
                    history.push('/');
                }
            });
        }
        catch(err){
            console.log(err);
            alert('Usuário não logado');
            localStorage.clear();
            history.push('/');
        }

        // ************
        // Pegando incidents pela api
        // ************

        try{
            api.get('profile', {
                headers: {
                    Authorization: ongId
                }
            }).then( (response) => {
                setIncidents(response.data.result);
            })
        } catch{
            alert('Não foi possível buscar os casos.');
        }
        
        
    }, []);


    async function handlerDeleteIncident(id) {
        
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err){
            alert('Não foi possível buscar os casos.');
        }
    }

    function handlerLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem vinda, {ongName}</span>

                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button type='button' onClick={handlerLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>


                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'} ).format(incident.value)}</p>

                        <button type='button' onClick={() => handlerDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                    
                ))}

                
                
            </ul>
        </div>
    )
}