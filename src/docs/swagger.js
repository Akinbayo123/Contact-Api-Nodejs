// src/docs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Contact API",
            version: "1.0.0",
            description: "API for contacts + auth (Express + MongoDB)",
        },
        servers: [
            // If your routes are under `/api`, include it in the server URL
            { url: "http://localhost:3000/api" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                // Reusable models
                Contact: {
                    type: "object",
                    required: ["name", "email"],
                    properties: {
                        id: { type: "string", description: "Mongo ObjectId" },
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        phone: { type: "string", example: "+2348012345678" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                    example: {
                        id: "64f9f1d2a12b3c45d6789e01",
                        name: "Ada Lovelace",
                        email: "ada@example.com",
                        phone: "+2348012345678",
                        createdAt: "2025-08-24T10:12:34.000Z",
                        updatedAt: "2025-08-24T10:12:34.000Z",
                    },
                },
                ContactCreate: {
                    type: "object",
                    required: ["name", "email"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        phone: { type: "string" },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                    },
                    example: { email: "ada@example.com", password: "secret123" }
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        accessToken: { type: "string" },
                    },
                    example: { accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
                },
                Error: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        message: { type: "string" },
                        stackTrace: { type: ["string", "null"] },
                    },
                },
            },
        },
    },
    // 👇 make sure these globs correctly point to your files with JSDoc comments
    apis: ["./Routes/*.js", "./controllers/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;