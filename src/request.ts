/*
example:

import {send, get, post} from './request';

get('https://httpbin.org/get?a=b').then((respose) => {
    console.dir(respose.statusCode, {colors:true});
    console.dir(respose.headers, {colors:true});
    console.dir(respose.data, {colors:true});
    // if respose.data is a json string, respose.json will return the json object
    console.dir(respose.json, {colors:true});
});

post('https://httpbin.org/post?a=b').then((respose) => {
    console.dir(respose.statusCode, {colors:true});
    console.dir(respose.headers, {colors:true});
    console.dir(respose.data, {colors:true});
    // if respose.data is a json string, respose.json will return the json object
    console.dir(respose.json, {colors:true});
});
*/

import * as url from 'url';
import { stringify } from 'querystring';

export interface RequestConfig {
    data?: any;
    headers?: {};
    method?: string;
	protocol?: string;
};

export interface RequestResponse {
	statusCode: number;
	headers: {}[];
	data: string;
	json: {};
}

/**
 * @param {object} options
 * @param {object} options.data - post data e.g. form data or files
 * @param {object} options.headers - http headers
 * @param {string} options.method - POST GET etc
 */
export function send (urlString: string, options: RequestConfig = {}): Promise<RequestResponse> {
    return new Promise((resolve, reject) => {
        options = Object.assign(url.parse(urlString), options);

        const request = require(options.protocol === 'http:' ? 'http' : 'https').request(options, (response) => {
            response.setEncoding('utf8');
            let data = '';
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => {
				const requestResponse: RequestResponse = {
                    statusCode: response.statusCode,
                    headers: response.headers,
                    data: data,
                    get json () {
                        return JSON.parse(data);
                    }
                };
                resolve(requestResponse);
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        if (options.data) {
            request.write(options.data);
        }

        request.end();
    });
}

/**
 * @param {object} options
 * @param {object} options.headers - http headers
 */
export function get (url: string, options: RequestConfig = {}): Promise<RequestResponse> {
	delete options.data;
	return send(url, options);
}

/**
 * @param {object} options
 * @param {object} options.data - post data e.g. form data or files
 * @param {object} options.headers - http headers
 */
export function post (url: string, options: RequestConfig = {}): Promise<RequestResponse> {
	options.data = stringify(options.data || {});
	options.headers = Object.assign(options.headers || {}, {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(options.data)
	});
	options.method = 'POST';
	return send(url, options);
}
