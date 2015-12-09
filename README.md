Node LocalBitcoins
===========

NodeJS Client Library for the LocalBitcoins API

This is an asynchronous node js client for the localbitcoins.com API.

It exposes all the API methods found here: https://localbitcoins.com/api-docs/ through the 'api' method:

Example Usage:

`npm install localbitcoins-node`

```javascript
var LBCClient = require('localbitcoins-node');
var lbc = new LBCClient(api_key, api_secret);

var ad_id; //set to value when applicable
var params = {};


// Display user's info
lbc.api('myself', ad_id, params, function(error, data) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(data);
    }
});

```

To-Do:
- Get different methods working with querystring parameters added to message

Credit:

Forked from https://github.com/vnistor/
