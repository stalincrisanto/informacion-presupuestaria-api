import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Presupuestaria",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
      {
        url: "http://192.168.10.126/",
        description: "Servidor de pruebas",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Esto es opcional, solo si el token es JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Aplica la seguridad de Bearer a todas las rutas
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/**/*.ts")],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs ));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};
