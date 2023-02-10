const express = require("express");
const app = express();
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
var format = require('util').format;

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

// connect-form configuration


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
        });
    }
    else {
        response.status(202).send({
            message: "Content arrived",
            content: request.body.content,
        });
    }
})

// File Upload Enpoint
app.post("/file", (request, response, next) => {
    var form = new multiparty.Form();
    var image;

    form.on('error', next);
    form.on('close', function(){
        // response.send(format(
        //     '\nuploaded %s (%d Kb)',
        //     image.filename,
        //     image.size / 1024 | 0
        // ));

        response.status(200).send({
            message: "File uploaded",
            filename: image.filename,
            size: `${image.size / 1024 | 0} Kb`
        });
    })

    // listen on part event for image file
    form.on('part', function(part){
        if (!part.filename) return;
        if (part.name !== 'image') return part.resume();
        image = {};
        image.filename = part.filename;
        image.size = 0;
        part.on('data', function(buf){
            image.size += buf.length;
        });
    });

    // form.on('progress', function(){
    //     response.status(102).send({
    //         message: "Uploading file"
    //     });
    // })

    // parse the form
    form.parse(request);
})

module.exports = app;