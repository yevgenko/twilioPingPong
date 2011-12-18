Sample twilio ping-pong application built on top of [node-twilio](https://github.com/sjwalter/node-twilio) module.

The flow is simple, when you click "Ping" button, it will send "ping" message to the server and then server will call you back via [twilio client](http://www.twilio.com/api/client) to tell you "pong, pong, pong".

## NOTE

To make it possible to use sandbox resource, capability tokens and to run via localtunnel I incorporated the following pull requests into [my fork](https://github.com/yevgenko/node-twilio) of node-twilio:

* [Capability tokens for Twilio Client](https://github.com/sjwalter/node-twilio/pull/8)
* [Client externalPort option for Heroku compatibility](https://github.com/sjwalter/node-twilio/pull/12)
* [Added support for sandbox resource](https://github.com/sjwalter/node-twilio/pull/15)

> Thank you guys!

## Requirements

* [Node.js](http://nodejs.org/)
* [Twilio](http://www.twilio.com/) account with at least one verified number
* Internet browser with a flash plugin installed
* Computer speaker or headsets

## Installation

    git clone git://github.com/yevgenko/twilioPingPong.git
    cd twilioPingPong && npm install
    cp config.js.sample config.js
    vim config.js // update to your twilio creds

## Usage

    localtunnel -k ~/.ssh/id_rsa.pub 3000
    HOSTNAME="XXXX.localtunnel.com" node app.js // replace XXXX with value from localtunnel output

Open your browser, go to [XXXX.localtunnel.com](http://XXXX.localtunnel.com), wear your headsets and click "Ping" button ;)

Enjoy!
