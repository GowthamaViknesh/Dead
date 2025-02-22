import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Express API with Swagger documentation",
        },
    },
    apis: ["./server.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📜 Swagger Docs available at http://localhost:5000/api-docs`);
};

export default setupSwagger;
