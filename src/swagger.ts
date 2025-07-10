import swaggerJSDoc from 'swagger-jsdoc'
import config from './config'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'VAEP API',
    version: '1.0.0',
    description: 'Documentación generada con swagger-jsdoc',
  },
  servers: [
    {
      url: `${ config.server }`,
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./src/router/**/*.router.ts'], // Ajusta a la ruta de tus archivos de rutas
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
