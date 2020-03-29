exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        //informar agora os campos
        table.increments(); 

        table.string('title').notNullable(); //nao pode ser nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();//campo que vai identificar qual ong creou o caso

        table.foreign('ong_id').references('id').inTable('ongs');
    }); // crea tabela das ongs, chama chave extranjeira.
};


exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};// depois de criar todos oa campos dar o comando npx knex migrate:latest