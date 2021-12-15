import * as HapiSwagger from 'hapi-swagger';

export const swaggerOptions: HapiSwagger.RegisterOptions = {
  pathPrefixSize: process.env.ROUTE_PREFIX ? process.env.ROUTE_PREFIX.length : 0,
  host: `${process.env.BASE_URL}`,
  basePath: `${process.env.ROUTE_PREFIX || '/api'}/`,
  grouping: 'tags',
  info: {
    title: 'API Documentation',
    version: '',
    description: 'description'
  },
  securityDefinitions: {
    Bearer: {
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header',
      'x-keyPrefix': 'Bearer '
    }
  },
  security: [
    {
      Bearer: []
    }
  ],
  jsonPath: `${process.env.SWAGGER_PREFIX || '/api-info'}.json`,
  documentationPath: `${process.env.SWAGGER_PREFIX || '/api-info'}`,
  schemes: [],
  debug: true
};
