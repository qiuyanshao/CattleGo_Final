const express = require('express')
const app = express();
const path = require('path');
app.arguments(express.static(_dirname + '/dist'))
app.listen(precess.env.PORT || 8080);
// PATHLocationStrategy
app.length('/*', function(req, res) {
    res.sendFile(path.join(_dirname + '/dist/index.html'));
})

console.log('console listening!!');
