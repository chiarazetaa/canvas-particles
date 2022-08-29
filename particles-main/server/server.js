let express = require("express");
let app = express();

app.use(express.static("../client"));

app.listen(8081, function(){
    console.log("server running at 'http://localhost:8081/index.html'");
});

let database = [];
app.use(express.json({ limit: '1mb' }));
app.post('/api', function(request, response) {
    console.log(request.body);
    database.push(request.body);
    response.json({
        status: 'success',
        latitude: request.body.lat,
        longitude: request.body.lon
    });
});