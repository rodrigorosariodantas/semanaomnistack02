    exports.up = function(knex) { //metodo up eh para a criacao 
        //o comandos aqui utilizados foram pegos do site da knex sessao migrate
        return knex.schema.createTable('ongs', function(table) {
            //informar agora os campos
            table.string('id').primary(); //chave primaria
            table.string('name').notNullable(); //nao pode ser nulo
            table.string('email').notNullable();
            table.string('whatsapp').notNullable();
            table.string('city').notNullable();
            table.string('uf', 2).notNullable(); // 2 = numeros de caracteres
    
        }); // crea tabela das ongs
    };
    
    exports.down = function(knex) { //metodo dawn eh para se der problema e precisar voltar a tras
        return knex.schema.dropTable('ongs'); //deletar a tablea
        //para criar a tablea dar o comando npx knex migrate:latest no terminal
    };
    //dar o comandos para crear armazer os casos npx knex migrate:make create_incidents


