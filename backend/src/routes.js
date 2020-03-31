const express = require('express');//1- importando o express
//16- essa rota de crypto foi para o arquivo OngController 
//const crypto = require('crypto');//5- este pacote eh importado para gerar a ID da ONG
const OngController = require('./controllers/OngController');//17- apos levar os comandos para dentro do arquivo OngControlers ele foi importado aqui
const IncidentController = require('./controllers/IncidentController');//22- variavel importada depois de criada no IncidentController
const ProfileController = require('./controllers/ProfileController');//26- creado depois do arquivo ProfileController
const SessionController = require('./controllers/SessionController');
const routes = express.Router();//2- cria variavel chamada routes pegando o modulo express
// apaga a importacao da conexao pq nao eh mais
//usadas aqui no routes const connection = require('./database/connection');//8- importado para estabelecer conexao com o bd

//----------------Cadastro de ong--------------------------------------------------

routes.post('/ongs', OngController.create //18- todos os comando abaixo foram substituidos pela variavel importada OngController
    /* 
    15- toda esse conteudo entre '/ * * /' foi inserido dentro do arquivo OngController
    //3- tras as rotas pra aqui p dentro. o metodo post vai criar. 
                                            //en este exemplo como eu quero criar  uma ng ponho o post e a rota
   
    const {name, email, whatsapp, city, uf} = request.body; 
                                            //4- aqui eh feita uma desestruturacao dos dadps
                                            //para que cada dados fique dentro de uma variavel
                                            //assim evitase que o usuario envie un dado que as vezes nao queremos que ele preencha        

    const id = crypto.randomBytes(4).toString('HEX') //6- randomBytes(4)irá gerar 4 bytes de caracteres aleatorios
                                            //toString converter os caracteres para string e do tipo hexadecimal, conletras e numeros, acho
    await connection('/ongs').insert({  //9- usa o connection e pega o nome da table que quer inserir os dados
                                        //neste caso 'ongs' e utiliza o metodo insert() e poe todas as
                                         //colunas que quer inserir lá dentro. como o insert pode demorar poe o async await
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });
    return response.json({id}); */   //10- aqui eh o que vai retornar para a ong. no caso o id que foi gerado na criacao
                                    //para testar neste momento ir no insominia e send a requisicao create que deve retornar un id
                                    //{"id": "1598bd2e"} exemplo
);
//----------------Cadastro de ong--------------------------------------------------


//----------------listagem de ong--------------------------------------------------
routes.get('/ongs', OngController.index //20- todos os comandos abaixos foram substituidos por OngController,index
        /* 19- toda essa logica foi enviada ao OngController
    async (request, response) => {//11- rota criada para listar todas as ongs por isso get e *(todos os campos de todos os registro)
   
    const ongs = await connection('ongs').select('*')

    return response.json(ongs);//12- vai retornar un array entao chama ongs direto
}*/);                             //13- apos criada essa rota criase a requisicao list no insominia 
//----------------listagem de ong --------------------------------------------------

//----------------listagem de casos(incidents) --------------------------------------------------
routes.post('/incidents', IncidentController.create);//21- rota criada apos criacao do IncidentController
routes.get('/incidents', IncidentController.index); //23-uma rota para verificar se os incidents estao sendo cadastrados com sucesso
routes.delete('/incidents/:id',IncidentController.delete )//25-recebe un rout params para saber qual (id do incident)incidente quer deletar
                                                        // no IncidentController cria o methodo chamado delete

//----------------listagem de casos(incidents) ---------------------------------------

//----------------profile com casos de uma unica ONG ---------------------------------------
routes.get('/profile', ProfileController.index);//27- rota do ProfileController, e agora vamos ao insomnia cria 
                                                //criar a requisicao profile do tipo GET
                                                //28- criado profile, criar arquivo SessionController
//----------------profile com casos de uma unica ONG -------------------------------

//----------------Sessao da ONG -------------------------------
routes.post('/sessions', SessionController.create);//29- rota da sessao session que controlará login e logout
                                            //utiliza o método POSt no sentido de querer crear uma sessao

//----------------Sessao da ONG -------------------------------
module.exports = routes;//isso exporta as rotas para deixalas disponiveis para outros arquivos

//7- cria a pasta connection.js dentro de data base para conectar a ong criada.
//14- para abstrair a logica que temos dentro das rotas e controlar melhor criase a pasta controllers
//e para cada uma das entidades criamos uncontroller