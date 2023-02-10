const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
  
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ENDPOINTS

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    next();
});

// Messaging Endpoint
app.post("/message", (request, response) => {
    if (request.body.content == null) {
        response.status(204).send({
            message: "Null content arrived",
            content: request.body.content || null,
        })
    }
    else {
        response.status(202).send({
            message: "Content arrived",
            content: request.body.content,
        })
    }
})

module.exports = app;