//1- index.js primeiro arquivo criado do projeto, que vai armazer todo projeto

const express = require('express');//2- importa o modulo express para a variável express
const cors = require('cors')//8-  importando o cors apos instalado
const routes = require('./routes')//8- importa os dados do arquivo routes
const app = express();//3- cria a variável que vai armazenar a aplicacao, que vai ter as rotas e a parte de funcionalidade

app.use(cors());//9- declar o cors
app.use(express.json());//6- transfor em algo entendivel pela aplicacao
app.use(routes);//9- para por rotas em funcionamento. importante que seja abaixo do app.use(express.json());
//app.get('/', (request, response) => {//o que vem depois da barra eh o recurso que se está querendo acessar
//    return response.send('hello world');
//});//5- para crear a rota get('/...') e passa uma funcao () => {}

app.listen(3333);//4- manda a aplicacao ouvir a porta 3333; separa node, react por portas. node na 3333 react na 3000 etc

//para executar esta aplicacao $ node index.js

//7- daqui passa para criar o arquivo routes