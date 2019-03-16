/*!
 * rpcclient.js - json rpc client for bcoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';
const request = require('./request');

/**
 * Bcoin RPC client.
 * @alias module:http.RPCClient
 * @constructor
 * @param {String} uri
 * @param {Object?} options
 */

function RPCClient(options) {
    this.uri = `${options.protocol || 'http'}://${options.host}:${options.port || 18333}${options.path}`;
    console.log('URI = ', this.uri)
    if (!options.auth) {
        this.username = options.username;
        this.password = options.password;
    }
    else {
        let explodes = options.auth.split(":");
        if (explodes.length !== 2) throw new Error('Invalid user name and password.');
        this.username = explodes[0];
        this.password = explodes[1];
    }
    this.id = 0;
}

/**
 * Make a json rpc request.
 * @private
 * @param {String} method - RPC method name.
 * @param {Array} params - RPC parameters.
 * @returns {Promise} - Returns Object?.
 */

RPCClient.prototype.execute = async function execute(method, params) {
    console.log(method, params)
    console.log({
        username: this.username,
        password: this.password,
        uri: this.uri
    })
    const res = await request({
        method: 'POST',
        uri: this.uri,
        // pool: true,
        json: {
            method: method,
            params: params,
            id: this.id++
        },
        auth: {
            username: this.username,
            password: this.password
        }
    });

    console.log('ERROR URI = ', this.uri)
    if (res.statusCode === 401)
        throw new RPCError('Unauthorized (bad API key).', -1);

    // if (res.statusCode !== 200)
    //     throw new Error(`Status code: ${res.statusCode}.`);

    if (res.type !== 'json')
        throw new Error('Bad response (wrong content-type).');

    if (!res.body)
        throw new Error('No body for JSON-RPC response.');

    if (res.body.error)
        throw new RPCError(res.body.error.message, res.body.error.code);

    return res.body.result;
};

/*
 * Helpers
 */

function RPCError(msg, code) {
    Error.call(this);

    this.type = 'RPCError';
    this.message = String(msg);
    this.code = code >>> 0;

    if (Error.captureStackTrace)
        Error.captureStackTrace(this, RPCError);
}

Object.setPrototypeOf(RPCError.prototype, Error.prototype);

/*
 * Expose
 */

module.exports = RPCClient;
