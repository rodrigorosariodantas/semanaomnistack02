import React, { useState }from 'react';//1-import o react //13- chamando o useState para armazenar os dados dos inputs
import './styles.css';//importa o css
import logoImg from '../../assets/logo.svg'; //4-importa a logo pois será usada
import { Link, useHistory } from 'react-router-dom';//5-importa o Link para ser usado //21- use Hostpry para enviar o usuario de volta para a pagina inicial
import { FiArrowLeft } from 'react-icons/fi';//6- importa o icone para ser usado no backlink. o nome dos icones pega no site feathericons precedidos de Fi.
import api from '../../services/api'//8- importar a variavel api de integracao con o backend

export default function Register() {//2-cria e exporta a funcao de registro
    const [name, setName] = useState('');//12- armazenando os dados de cada um dos valores
    const [email, setemail] = useState('');//do formularios em um stado
    const [whatsapp, setwhatsapp] = useState('');
    const [city, setcity] = useState('');
    const [uf, setuf] = useState('');

    const history = useHistory();//22- criada variável useHistory

    async function handleRegister(e){//9- essa funcao sera responsavel por fazer o cadastro do usuario
        e.preventDefault(); //11- por padrao todo form qd eh enviado a pagina recarrega
                            //para previnir esse comportamento, dentro da funcao register
                            //recebe o evento (e) de submite do form e fazer um e.preventDefault()


        const data = { //15- na variavel data eh pego todos os dados do formulario
            name,
            email,
            whatsapp,
            city,
            uf
        };      //19- o try eh para verificar se a funcao falhou ou nao. se deu certo executa o try
        try {   //17- para verificar a resposta crio a variavel response
                //para pegar a resposta q a chamada api.post irá retornar para gente, que é o id
                //mas para conseguir pegar a resposta tem que aguardar finalizar
                //por isso o await antes do api.post e o async antes da funcao 
            const response = await api.post('ongs', data) //16- aqui envio os dados para meu beckend. os dados da variavel data

            alert(`Seu ID de acesso: ${response.data.id}`)//18- se tudo deu certo retorna o alerta com o id

            history.push('/') //23- utilizada variavel para enviar usuario para pagina principal

        } catch (err) {//20- se deu erro executa o catch
            alert(`Erro no cadastro`)
        }
    }
    
    
    return (//3-cria as div, form e as sessoes de acordo com o layalt
            //cria o img da logo
            //4- poe o mesmo back-link
            //7- insere os inputs con placeholders e o button
    
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="nome da logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Nao tenho Cadastro
                     </ Link>
                </section>
                <form onSubmit={handleRegister} //10- aqui chama a funcao qd pulsa o botao
                >
                    <input 
                        placeholder='Nome da Ong'
                        value={name}                            //14- para cada un por inputs por o value
                        onChange={e => setName(e.target.value)}//aqui ouvir as mudancas que ocorrem no input
                    />                      
                    <input type="email" placeholder='E-mail' //pega o evento de mudanca e => da un setName
                        value={email}                       //e.target.value isto representa o valor do input
                        onChange={e => setemail(e.target.value)}//que é posto dentro da variável name q vai estar armazenando no estado
                    />
                    <input  placeholder='whatsapp'          //e isto para todos os inputs
                        value={whatsapp}
                        onChange={e => setwhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                     <input  placeholder='Cidade' 
                        value={city}
                        onChange={e => setcity(e.target.value)}
                     /> 
                     <input  placeholder='UF' style={{ width: 80 }} 
                        value={uf}
                        onChange={e => setuf(e.target.value)}
                     /> 
                    </div>
                    <button className='button' type="submit">Cadastrar</button>
                </form>
                
            </div>
        </div>

    );
}

//24- agora ir fazer as conexoes da pagina de login