import React, { useState } from 'react'; //1- importar React //4-importa o useState
import './styles.css';//2- importar css
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';//14- pega o useHistory
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'; //11- importa a api


export default function NewIncident() {
    const [title, setTitle] = useState(''); //5- cria os estados para cada um dos inputs
    const [description, setDescription] = useState('');
    const [value, setvalue] = useState('');
    const ongId = localStorage.getItem('ongId');//14- cria a variavel ongId do localStorage
    const history = useHistory();//15- usa o useHistory
    async function handleNewIncident(e) {//7- cria a funcao
                                         //e.prevent para prevenir o padrao do form
        e.preventDefault();
        const data = { //9- cria o objeto chamado data com os campos que usaremos
            title,
            description,
            value,
        };

        try { //10- cria o try catch para enviar msg para o usuario
            await api.post('incidents', data, { //12- usa a api con a rota pegando a variavel data
                headers: {//13- usar o headers para pegar o ongId
                    Authorization: ongId,
                }
            })
            history.push('/profile');//16- mandar ele p rota profile
        } catch (err) {
            alert('erro ao cadastrar caso')
        }
    }

    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Nome da Logo" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso</p>
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar Para home
                    </ Link>

                </section>
                <form onSubmit={handleNewIncident} //chama a funcao no form
                >
                    <input //6- no inputs poe o value e o onChenge
                        placeholder='Titulo do Caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder='description' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input  
                        placeholder='Valor em Reais' 
                        value={value}
                        onChange={e => setvalue(e.target.value)}
                    />
                    
                    <button className='button' type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

//3- ir as rotas para importar o newincident