
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , stache = require('stache')
  , TwilioClient = require('twilio').Client
  , Twiml = require('twilio').Twiml
  , TwilioCapability = require('twilio').Capability
  , creds = require('./config').Credentials
  , capability = new TwilioCapability(creds.sid, creds.authToken);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.set('view options', {layout: false});
  app.register('.mustache', stache);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var port = process.env.PORT || 3000;
var client = new TwilioClient(creds.sid, creds.authToken, process.env.HOSTNAME, {
  express: app
, port: port
});

// Routes

app.get('/', function(req, res) {
  capability.allowClientIncoming(creds.name);
  var token = capability.generateToken(7200);
  var phone = client.getPhoneNumber(creds.phone);
  res.render('index', { title: 'Twilio ping-pong', token: token });
  phone.setup(function() {
    phone.on('incomingCall', function(reqParams, resp) {
      resp.append(new Twiml.Dial([new Twiml.Cli(creds.name)]));
      resp.send();
    });
  });
});

app.post('/ping', function(req, res) {
  var sandbox = client.getSandbox();
  var message = req.body.msg || 'pong';
  res.send({status: 'ok'});
  sandbox.setup(function() {
    sandbox.makeCall(creds.phone, null, function(call) {
      call.on('answered', function(reqParams, resp) {
        resp.append(new Twiml.Pause({'length': 3}));
        resp.append(new Twiml.Say(message, {'loop': 3}));
        resp.send();
      });
      call.on('ended', function(reqParams, resp) {
        console.log('outgoing call ended');
        resp.send();
      });
    });
  });
});

/* app.listen(3000); */
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
