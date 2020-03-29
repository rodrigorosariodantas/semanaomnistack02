const crypto = require('crypto');
const connection = require('../database/connection');//1- como vai precisar de coneccao com o banco tem que chamar no comeco do arquivo


module.exports = {
    async index(request, response) {//3- logiaca trazida do routes. normalmente as rotas de listagem chamamos index
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create(request, response) { //2- logiaca trazida do routes
        const { name, email, whatsapp, city, uf } = request.body;        

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    return response.json({id});
    }
};