var request = require('request')
var crypto		= require('crypto');
var querystring	= require('querystring');
var nonce = new Date() * 1000; // spoof microsecond

function LBCClient(key, secret, otp) {
	var self = this;
  
	var config = {
		url: 'https://localbitcoins.com/api',
		key: key,
		secret: secret,
		otp: otp,
		timeoutMS: 5000
	};

	/**
	 * This method makes a public or private API request.
	 * @param  {String}   method   The API method (public or private)
	 * @param  {Object}   params   Arguments to pass to the api call
	 * @param  {Function} callback A callback function to be executed when the request is complete
	 * @return {Object}            The request object
	 */
	function api(method, params, callback) {
		var methods = {
			public: [],
			private: ['ad-get', 'ad-get/ad_id', 'myself']
		};
		if(methods.public.indexOf(method) !== -1) {
			return publicMethod(method, params, callback);
		}
		else if(methods.private.indexOf(method) !== -1) {
			return privateMethod(method, params, callback);
		}
		else {
			throw new Error(method + ' is not a valid API method.');
		}
	}

	/**
	 * This method makes a public API request.
	 * @param  {String}   method   The API method (public or private)
	 * @param  {Object}   params   Arguments to pass to the api call
	 * @param  {Function} callback A callback function to be executed when the request is complete
	 * @return {Object}            The request object
	 */
	function publicMethod(method, params, callback) {
		params = params || {};

		var path	= '/' + method;
		var url		= config.url + path;

		return rawRequest(url, {}, params, callback);
	}

	/**
	 * This method makes a private API request.
	 * @param  {String}   method   The API method (public or private)
	 * @param  {Object}   params   Arguments to pass to the api call
	 * @param  {Function} callback A callback function to be executed when the request is complete
	 * @return {Object}            The request object
	 */
	function privateMethod(method, params, callback) {
		params = params || {};

		var path	= '/' + method;
		var url		= config.url + path;

		params.nonce = new Date() * 1000; // spoof microsecond

		if(config.otp !== undefined) {
			params.otp = config.otp;
		}

		var signature = getMessageSignature(path, params, params.nonce);

		var headers = {
			'Apiauth-Key': config.key,
			'Apiauth-Nonce': nonce,
			'Apiauth-Signature': signature
		};

		return rawRequest(url, headers, params, callback);
	}

	/**
	 * This method returns a signature for a request as a Base64-encoded string
	 * @param  {String}  path    The relative URL path for the request
	 * @param  {Object}  request The POST body
	 * @param  {Integer} nonce   A unique, incrementing integer
	 * @return {String}          The request signature
	 */
	function getMessageSignature(path, request, nonce) {
		var message	= querystring.stringify(request);
		var secret	= new Buffer(config.secret, 'base64');
		var hash	= new crypto.createHash('sha256');
		var hmac	= new crypto.createHmac('sha256', secret);
		var hash_digest	= nonce + config.key + config.path + message;
		var hmac_digest	= hmac.update(hash_digest, 'binary').digest('binary').toUpperCase();

		return hmac_digest;
	}

	/**
	 * This method sends the actual HTTP request
	 * @param  {String}   url      The URL to make the request
	 * @param  {Object}   headers  Request headers
	 * @param  {Object}   params   POST body
	 * @param  {Function} callback A callback function to call when the request is complete
	 * @return {Object}            The request object
	 */
	function rawRequest(url, headers, params, callback) {
		// Set custom User-Agent string
		headers['User-Agent'] = 'LocalBitcoins NodeJS API Client';

		var options = {
			url: url,
			method: 'POST',
			headers: headers,
			form: params,
			timeout: config.timeoutMS
		};

		var req = request.post(options, function(error, response, body) {
			if(typeof callback === 'function') {
				var data;

				if(error) {
					callback.call(self, new Error('Error in server response: ' + JSON.stringify(error)), null);
					return;
				}

				try {
					data = JSON.parse(body);
				}
				catch(e) {
					callback.call(self, new Error('Could not understand response from server: ' + body), null);
					return;
				}

				if(data.error && data.error.length) {
					callback.call(self, data.error, null);
				}
				else {
					callback.call(self, null, data);
				}
			}
		});

		return req;
	}

	self.api			= api;
	self.publicMethod	= publicMethod;
	self.privateMethod	= privateMethod;
}

var lbc = new LBCClient('key', 'secret')

lbc.api('myself', null, function(error, data) {
    if(error) {
       console.log("LBC error: "+error);
        }
        else {
            console.log("LBC result: " + JSON.stringify(data));
        };
    });

module.exports = LBCClient;
