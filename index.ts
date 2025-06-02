import express from "express";
import router from "./src/routes";
// import { testConnection } from "./src/config/db";
import cors from "cors";
import { setupSwagger } from "./src/config/swagger";
// import swaggerDocs from "./src/config/swagger";

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", router);

// swaggerDocs(app, Number(process.env.PORT_SERVER));
setupSwagger(app);

app.listen(process.env.PORT_SERVER, () => {
  // testConnection();
  console.log(`server listening on port ${process.env.PORT_SERVER}`);
  console.log(`Swagger docs available at http://localhost:${process.env.PORT_SERVER}/api-docs`);
});
