import * as handlers from '../../api/v1/example';
import { ServerRoute } from '@hapi/hapi';
import { exampleValidateSchema } from '../../schemes/example';

export default [
  {
    method: 'GET',
    path: '/v1/example/{exampleParam}',
    handler: handlers.exampleHandler,
    options: {
      id: 'v1.example.exampleHand',
      auth: false,
      tags: ['api', 'v1', 'example'],
      description: 'For example desc',
      notes: 'For example notes',
      validate: {
        params: exampleValidateSchema
      }
    }
  }
] as ServerRoute[];
