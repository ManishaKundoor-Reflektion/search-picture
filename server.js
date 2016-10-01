    var express = require('express'); 
    var app = express(); 
    var bodyParser = require('body-parser');
    //var multer = require('multer');

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    /** Serving from the same express Server
    No cors required */
    app.use(express.static('./src'))
    app.use(bodyParser.json());

    require('./searchPicture/router.js')(app);

    app.listen('3000', function(){
        console.log('running on 3000...');
    });
