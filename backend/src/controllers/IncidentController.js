const connection = require('../database/connection')

module.exports = { //1- exportar un objeto
    async index(request, response) {
        const { page = 1 } = request.query;//13- fazer paginacao para n retornar todos os incidents de uma vez
                        //buscar un parametro chamado page comecando pela pag 1
        const [count] = await connection('incidents')//15- buscar uma query para retornar o numero total de casos
        .count()                                    //couchetes para pegar somente a primeira posicao do array
                                                    //neste instante un console.log(count) para ver o retorno;
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id' )//16- quero trazer os dados databela de ongs, trazer 
                                            //apenas os dados onde o id da table de ongs
                                            // seja '=' incidents.ong_id
        .limit(5)//14- limitar a 5 casos por page
        .offset((page - 1) * 5)//aqui nao quero pular a page 1, e as proximas pular de 5 em 5 casos
        .select([           //7- conecta con a tabela incidents e seleciona todos os dados, posteriorment 17- foi alterado para buscar somente os dados listados
            'incidents.*',   //8- vai en routes e cria a routes.get('incidents', IncidentController.index)
            'ongs.name',      //dentro do insomnia criase a requisito create list format .
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);      
                   
                   
        response.header('X-Total-Count', count['count(*)']);//isto para nao retornar no corpo e sim no cabecalho a resposta
                                            //'X-Total-Count' eh o nome dado ao cabecalho
        return response.json(incidents);
    },
    async create(request, response) {
       const { title, description, value } = request.body; //2-este objeto conterá para cadastrar un caso o title, description e valor
       const ong_id = request.headers.authorization;//3- o id q diz q ong tá criado o caso iremos trazer no cabecalho
                                                    //normalmente aqui vem dados como idioma
                                                    //authorization foi criado no insomnia na requisicao creat dos caso ou Incidents
                                                    //a variavel ong_id eh criada para acessar os dados da ong que está criando
        const [id] = await connection('incidents').insert({//4-aqui vou conectar con a table incidents
                                              //inserir os dados title, description, valur e ong_id
            title,
            description,
            value,
            ong_id
        });
         
        return response.json( {id} );      //5 para retornar o id q foi gerado a partir do cadastro acima
                                             //crio a variavel acima const [id]
                                             //e retorno ela en chaves para ficar o nome da informacao
    },

    async delete(request, response) {//9- cria o metodo delete
        const {id} = request.params; //pega o {id} que vem la do nosso request.params parametro de rotas
        const ong_id = request.headers.authorization;//pega o id da ong logada
        const incident = await connection('incidents')//buscar o incidente de dentro da table incidents
        .where('id', id)//onde o id for igual ao {id} de cima
        .select('ong_id')//selecionar apenas a coluna id
        .first();//como vai retornar so um registro firts()/

        if (incident.ong_id !== ong_id) {//10- fazer uma verificacao
                                        //se o ong_id do incident for diferent do ong_id logado
            return response.status(401)//retornar status 401 q eh nao autorizado,
            .json({error: "Operation Not Permited"}); //com o erro operation...
        }

        await connection('incidents')//11- se tudo deu certo conectar con a tabela incidents
        .where('id', id)//buscando pelo {id}
        .delete();//e entao deletar

        return response
        .status(204)//12- retornar uma resposta 204, que eh uma resposta que deu certomas n tem conteudo
        .send();//para enviar a resposta vazia
                //criar no insomnia a requisicao delete      
    } 

};

//6 vai para o routes e cria uma nova rota do tipo POST routes.post('incidents')
//18- finalizado instalar o cors $npm install cors e ir para pasta index.js