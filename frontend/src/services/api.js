import axios from 'axios';//1-importar o axios instalado anteriormente

const api = axios.create({//2- cria uma variavel
    baseURL: 'http://localhost:3333',//3-eh a parte da URL que vai ser mantida em todas as chamadas
});

export default api;//4- exportar para estar acessivel

//5- ver a parte do register para fazer a primeira integracao