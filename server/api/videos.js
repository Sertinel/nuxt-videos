import { createError, defineEventHandler, readBody } from 'h3';
import knex from '../database/knex.js';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const id = event.context.params?.id;

  switch (method) {
    case 'GET':
      if (id) {
        const video = await knex('videos').where({ id }).first();
        return (
          video ||
          createError({ statusCode: 404, statusMessage: 'Video not found' })
        );
      }
      return await knex('videos').select('*');

    case 'POST':
      const newVideo = await readBody(event);
      const [createdId] = await knex('videos').insert(newVideo);
      return { id: createdId, ...newVideo };

    case 'PUT':
      if (!id) {
        return createError({
          statusCode: 400,
          statusMessage: 'ID is required',
        });
      }
      const updatedVideo = await readBody(event);
      await knex('videos').where({ id }).update(updatedVideo);
      return { id, ...updatedVideo };

    case 'DELETE':
      if (!id) {
        return createError({
          statusCode: 400,
          statusMessage: 'ID is required',
        });
      }
      await knex('videos').where({ id }).del();
      return { message: 'Video deleted successfully' };

    default:
      return createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      });
  }
});
