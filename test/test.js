/*

  ___ ___       ___               _ _       _   ___ ___ 
 | __/ __|  ___| _ \___ _ _ _ __ (_) |_    /_\ | _ \_ _|
 | _|\__ \ / -_)  _/ -_) '_| '  \| |  _|  / _ \|  _/| | 
 |_| |___/ \___|_| \___|_| |_|_|_|_|\__| /_/ \_\_| |___|

*/

//*******************************************************************

'use strict';

//*******************************************************************

const include = require('include')(__dirname);
const request = require('supertest');
const server = include('src/index.js');

const util = require('./utility.js');

const chai = require('chai');
const expect = chai.expect;
const factory = require('unionized');

const testURL = '/permits/applications/special-uses/noncommercial/';
const noncommercialInput = include('test/data/testInputNoncommercial.json');
const noncommercialFactory = factory.factory(noncommercialInput);

//*******************************************************************

describe('FS ePermit API', function() {

	let token;
	let postControlNumber;

	before(function(done) {

		util.getToken(function(t){

			token = t;
			return done();

		});
	
	});
	
	it('should return html format if web page', function(done) {

		request(server)
			.get('/')
			.set('x-access-token', token)
			.expect('Content-Type', /html/)
			.expect(200, done);
	
	});
	
	it('should return a 404 error if invalid', function(done) {

		request(server)
			.get('/asdfsad/')
			.set('x-access-token', token)
			.expect(404, done);
	
	});

	it('should return valid json for noncommercial POST (controlNumber to be used in GET)', function(done) {

		request(server)
			.post('/permits/applications/special-uses/noncommercial/')
			.set('x-access-token', token)
			.send(noncommercialFactory.create())
			.expect('Content-Type', /json/)
			.expect(function(res){
				postControlNumber = res.body.controlNumber;
			})
			.expect(200, done);

	});
	
	it('should not have x-powered-by header', function(done) {

		request(server)
			.get(`${testURL}${postControlNumber}/`)
			.set('x-access-token', token)
			.expect(function(res) {

				expect(res.headers).to.not.have.key('x-powered-by');
						
			})
			.expect(200, done);
	
	});
	
	it('should have cors support', function(done) {

		request(server)
			.get(`${testURL}${postControlNumber}/`)
			.set('x-access-token', token)
			.expect(function(res) {

				expect(res.headers['access-control-allow-origin']).to.equal('*');
			
			})
			.expect(200, done);
	
	});

	it('should have cache-control set', function(done) {

		request(server)
			.get(`${testURL}${postControlNumber}/`)
			.set('x-access-token', token)
			.expect(function(res) {

				expect(res.headers['cache-control']).to.equal('no-store, no-cache, must-revalidate, proxy-revalidate');
			
			})
			.expect(200, done);
	
	});

	it('should have pragma set', function(done) {

		request(server)
			.get(`${testURL}${postControlNumber}/`)
			.set('x-access-token', token)
			.expect(function(res) {

				expect(res.headers.pragma).to.equal('no-cache');
			
			})
			.expect(200, done);
	
	});

	it('should have x-xss-protection set', function(done) {

		request(server)
			.get(`${testURL}${postControlNumber}/`)
			.set('x-access-token', token)
			.expect(function(res) {
				
				expect(res.headers['x-xss-protection']).to.equal('1; mode=block');
			
			})
			.expect(200, done);
	
	});

});

//*******************************************************************

