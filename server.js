require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errorMiddleware } = require("./middlewares/error.middleware");
const router = require("./routes/router");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const multer = require("multer");
const swaggerDocument = YAML.load("./swagger.doc.yaml");

require("./config/mongo.connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: "GET, POST, PUT, DELETE",
//         credentials: true,
//         allowedHeaders: "Content-Type,Authorization,folder",
//         exposedHeaders: "Content-Range,X-Content-Range",
//     })
// );

app.use(cors());

app.use("/api/v1", router);

app.get("/ping", errorMiddleware, (req, res) => {
    res.status(200).json({
        message: "API sucessfully pinged 🐢",
    });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(` ✨ API started at http://localhost:${port}/api/v1 🐢🐢`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
