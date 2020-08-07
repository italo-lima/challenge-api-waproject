import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('solicitations', table => {
    table.increments('id').primary(),
      table.string('name').notNullable(),
      table.string('description').notNullable(),
      table.decimal('amount').notNullable();
    table.float('value').notNullable();
    table
      .timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('solicitations');
}
