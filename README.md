Node LocalBitcoins
===========

NodeJS Client Library for the LocalBitcoins API

This is an asynchronous node js client for the localbitcoins.com API.

It exposes all the API methods found here: https://localbitcoins.com/api-docs/ through the 'api' method:

Example Usage:

```javascript
var LBCClient = require('kraken-api');
var lbc = new LBCClient('api_key', 'api_secret');

// Display user's balance
lbc.api('myself', null, function(error, data) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(data);
    }
});

// Get Ticker Info
kraken.api('Ticker', {"pair": 'XBTCXLTC'}, function(error, data) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(data.result);
    }
});
```

**Update:**

As of version 0.1.0, the callback passed to the *api* function conforms to the Node.js standard of

```javascript
function(error, data) {
    // ...
}
```

Thanks to @tehsenaus and @petermrg for pointing this out.

Credit:

I used the example php implementation at https://github.com/payward/kraken-api-client and the python implementation at https://github.com/veox/krakenex as references.


Feeling generous? Send me a fraction of a bitcoin!

12X8GyUpfYxEP7sh1QaU4ngWYpzXJByQn5
