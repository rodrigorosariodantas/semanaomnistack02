const knex = require('knex'); //1- importanto o knex
const configuration = require('../../knexfile');//2- importar as configuracoes do banco de dados

const connection = knex(configuration.development); //3- cria a conexao utilizando o knex
                                                    // passando como paramentro o configuration.development
                                                    //que eh a conexao de desenvolvimento

module.exports = connection;//4- exporta a conexao com o banco de dados 
                            //apos exportados tem q se imporat este arquivo nos arquivos que se 
                            //comunicarao com o banco de dados
                            //entao se imprtará no routes.js
