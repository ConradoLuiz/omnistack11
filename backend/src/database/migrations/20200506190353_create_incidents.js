
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        // ID DA ONG (CHAVE ESTRANGEIRA)
        table.string('ong_id').notNullable();

        // DECLARAÇÃO DO CONSTRAINT DE CHAVE ESTRANGEIRA
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('incidents');
};
