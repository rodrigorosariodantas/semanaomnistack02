const connection = require('../database/connection');//2- importacao do banco de dados


module.exports = {
    async create(request, response) {
        const {id} = request.body;//1- verificar se a ONG existe, buscar o ID pelo corpo
        
        const ong = await connection('ongs') //3- buscar uma ong no banco de dados
        .where('id', id)//onde o id da ong eh igual ao id recebido na sessao
        .select('name')//selecionar apenas o nome da ong que eh a unica info q vai retornar para o frontend
        .first(); // como buscamos por id logicamente retornará uma unica ong se existir

        if(!ong) {//4- se a ong nao existir
            return response.status(400)
            .json('error: No ONG found');
        }
        return response.json(ong);//5- se tudo deu certo retornar apenas a ong. nocaso o nome dela

    }
}

//6- ir no insomnia e criar request login do tipo POST format JSON 