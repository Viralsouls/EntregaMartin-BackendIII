import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'Documentación de la API del proyecto de entrega final de Juan Martin',
    },
  },
  apis: ['./src/docs/**/*.yaml'], // Ruta a tus docs
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export const swaggerUiSetup = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};