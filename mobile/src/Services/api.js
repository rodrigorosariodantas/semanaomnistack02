import axios from 'axios'; //1- imoporta o axios para conexao backend

const api = axios.create({//2- cria a variavel api
    baseURL: 'http://192.168.0.16:3333' //3-utilizar o ip que esta sendo exibido dentro do axios + a porta do node
});

export default api;//4- exporta