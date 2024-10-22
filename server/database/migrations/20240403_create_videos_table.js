export function up(knex) {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('url').notNullable()
    table.json('player_settings').notNullable().defaultTo('{}')
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('videos')
}