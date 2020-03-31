//logon = pagina de login
import React, { useState } from 'react';//1- importar o react pois usaremos elementos HTML //9- importar o use state
import './styles.css';//3- importa o estilo css
import { FiLogIn } from 'react-icons/fi'; //7- importando o icone Login
import heroesImg from '../../assets/heroes.png';//3-importar a imagem como JS e usa como componente abaixo
import logoImg from '../../assets/logo.svg';//3-importar a imagem como JS
import { Link, useHistory } from 'react-router-dom';//importa o Link para substituir o <a href> e 
                                                        //assim a pagina nao precissa atualizar inteira mas só alguns elementos
                                                        //15- importa o use History
import api from '../../services/api';//8- importar a api

export default function Logon() {//2- cria e exporta a funcao logon 
    const [id, setId] = useState('');//10- cria un estado para o id
    const history = useHistory();//16- cria a variavel useHistory

    async function handleLogin(e){//12- cria uma funcao que vai precisar do id para enviar ao backend
                                //aqui o importante eh validar se a ong existe
                                //faz o e.prevent que se faz em todo formulario
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id}); //14- pega a resposta de api.post e envia o objeto id 
            localStorage.setItem('ongId', id); //para ter os dados do nome e Id em toda aplicacao 
                                                //salvo ele em localStorage
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')//17- aqui envia o usuario para sua área de profile onde tem a listagem dos casos
        } catch (err){
            alert('falha no login')
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt='nome da logo' />
                <form onSubmit={handleLogin} //13- passa a funcao handLogin para que ela seja disparada
                >
                    <h1>Faça seu Logon</h1>
                    <input //11- aqui traz o value e o onChenge para receber os valores do inpit
                    placeholder='Sua ID'
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Nao tenho Cadastro
                     </ Link>
                </form>
            </section>
            <img src={heroesImg} alt='heroes' />
            
        </div>
        //4- importamos a imagem pegando a variavel heroesImg e importando como objeto JS
    );  //5- insere a logoImg
        //6-formularios
}