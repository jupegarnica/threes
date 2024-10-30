/**
 * Created with threes.
 * User: jupegarnica
 * Date: 2014-10-29
 * Time: 07:28 PM
 */
var express = require('express');
var app = express();
var sys = require('sys')
var exec = require('child_process').exec;
var cmd1 = 'cd /etc/asterisk/;cp extensions.conf.';
var cmd2 = ' extensions.conf; asterisk -rx \"reload\"';
var juan = cmd1 + 'juan' + cmd2;
var fran = cmd1 + 'fran' + cmd2;
var home = cmd1 + 'sherpafono' + cmd2;

function puts(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null) {
        console.log('exec error: ' + error);
    }
}
app.get('/sherpafono/:id', function(req, res) {
    console.log('REQUEST FROM: ' + req.headers['x-real-ip'])
    console.log('TO: ' + req.params.id);
    if(req.params.id == 'juan') {
        exec(juan, puts)
    } else if(req.params.id == 'fran') {
        exec(fran, puts)
    } else if(req.params.id == 'home') {
        exec(home, puts)
    }
    res.send('ok, ahora voy');
    res.end();
});
var server = app.listen(3333, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port)
});