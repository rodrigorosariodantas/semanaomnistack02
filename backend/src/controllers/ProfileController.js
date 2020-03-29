const connection = require('../database/connection');//2- importacao do banco de dados

module.exports = {
    async index(request, response) {//1- metodo index q ira retornar os casos de uma unica ONG
        const ong_id = request.headers.authorization;    //acessar os dados da ong logada
   
        const incidents = await connection('incidents')//3- buscar todos os incidents
        .where('ong_id', ong_id)//que esta ong (on_id) criou
        .select('*');//buscar todos os campos

        return response.json(incidents);
    }
};

//4- agora ir criar a rota