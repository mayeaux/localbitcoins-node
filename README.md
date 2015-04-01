Node LocalBitcoins
===========

NodeJS Client Library for the LocalBitcoins API

This is an asynchronous node js client for the localbitcoins.com API.

It exposes all the API methods found here: https://localbitcoins.com/api-docs/ through the 'api' method:

Example Usage:

```javascript
var LBCClient = require('./lbc.js');
var lbc = new LBCClient('api_key', 'api_secret');

// Display user's info
lbc.api('myself', null, function(error, data) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(data);
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

I used the example node implementation at https://github.com/nothingisdead/npm-kraken-api and the python implementation at https://localbitcoins.com/api-docs/ as references.
