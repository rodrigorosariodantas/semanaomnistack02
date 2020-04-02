import React, {useState, useEffect} from 'react'; //1- importa o react 
                                                    //8- importa o useEffect, que serve para disparar um funcao em determinado momento
                                                    //14- pega o useState para gravar a informacao dentro dele
import './styles.css';//2importa css
import logoImg from '../../assets/logo.svg';//4-importa a logo que sera usada
import { Link, useHistory } from 'react-router-dom';//5-importa o link que será usado
                                                    //26importa o usehistory para o logout
import { FiPower, FiTrash2 } from 'react-icons/fi'//6-importa o incone que será usado
import api from '../../services/api';//10- importa a api

export default function Profile() {//3- cria a funcao
    const [incidents, setIncidents] = useState([]);//15- cria a variavel do usestate
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');//6- pega o ongName do localstorage para ser usado no header
    const history = useHistory();//27- chama o usehistory

    useEffect(() => {//9- o useEffect recebe dois parametros
                     //o primeir eh qual funcao que quero que seja usada
                    // o segundo eh qd essa funcao vai ser executada [array de dependencia]
                    //toda vez que as informacoes dentro do array mudarem ele executa a funcao
        api.get('profile', { //11- usa o api, pegando os incidents da rota profile
            headers: {//12- pega a ong que tá logada pelo ongId do localstorage
                Authorization: ongId,
            }
        }).then(response => {//13- para pegar a respota do estado
            setIncidents(response.data);//16- pega os datos
        })
    }, [ongId]);

    async function handleDeleteIncident(id) { //19- criada funcao para deletar un incident
                                            //q vai precisar receber o id do incident q quer deletar

        try {
            await api.delete(`incidents/${id}`, {//21-metoso delete com a rota
                headers: {
                    Authorization: ongId,//22para verificar a ong q quer deletar
                    }
                });

            setIncidents(incidents.filter(incident => incident.id !== id));//24- faz um filtro para retirar o que foi deletado
        } catch (err) {
            alert('erro ao deletar');//20- se der errado apresentar o erro
        }
    }

    function handleLogout() {//25- para logout e remover os dados do localhistorage
        localStorage.clear();
        history.push('/')//27-envia o usuario de volta para page princial
    }

    return (//3- cria a estructura html comas div, img....
            //7 usa o {ongName} para ser dinamico
            //28- por o handlogout no botao
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logoname"/>
                 <span>Bem vinda {ongName}</span>
                <Link className='button' to='incidents/new' >Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
               {incidents.map(incident => (//17- percorrer os incidents retornando um conteudo jsx(li)
                                            //qd faz uma repeticao eh interessante por a prop key
                                            //com um valor unico q nao vai mudar, neste caso id
                    <li key={incident.id}> 
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrptions</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color='#a8a8b3'/>
                        </button>
                     </li>//18- Intl para formatacao de valores
                            //23-chama a funcao para deletar

               ))}
               
            </ul>
        </div>
    );
}

//4- vai as rotas para importar

