import {Express} from "express";
import swaggerUI from 'swagger-ui-express';

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger API',
        version: '1.0.0',
    },
    paths: {
        '/api/v1/ping': {
            get: {
                tags: ['Health'],
                summary: 'Health the API',
                responses: {
                    200: {
                        description: 'Health API Response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {type: 'string'},
                                        timestamp: {type: 'string'},
                                        uptime: {type: 'number'},
                                        db: {type: 'string'},
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export function registerSwagger(app: Express): void {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}