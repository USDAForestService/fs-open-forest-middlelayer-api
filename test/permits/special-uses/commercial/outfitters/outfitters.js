/*

  ___ ___       ___               _ _       _   ___ ___ 
 | __/ __|  ___| _ \___ _ _ _ __ (_) |_    /_\ | _ \_ _|
 | _|\__ \ / -_)  _/ -_) "_| "  \| |  _|  / _ \|  _/| | 
 |_| |___/ \___|_| \___|_| |_|_|_|_|\__| /_/ \_\_| |___|

*/

//*******************************************************************

'use strict';

//*******************************************************************

const include = require('include')(__dirname);

//*******************************************************************

const request = require('supertest');
const server = include('index.js');
const util = include('test/utility.js');

const testInput = include('test/data/testInputOutfitters.json');

const chai = require('chai');
const expect = chai.expect;

//*******************************************************************
//Mock Input

const postInput = testInput.postInput;
const postInputNoOutfittersField = testInput.noOutfittersField;
const postInputNoApplicantInfo = testInput.noApplicantInfoField;

//*******************************************************************

describe('outfitters POST: validate required fields present', function(){

	let token;

	before(function(done) {

		util.getToken(function(t){

			token = t;
			return done();

		});
	
	});

	describe('validate required fields present: body fields', function(){

		it('should return valid json with a 400 status code for outfitters POST request without a body', function(done) {
		
			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('region and forest and district and applicantInfo and type and tempOutfitterFields are required fields!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an applicantInfo object', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInputNoApplicantInfo,
						{}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a tempOutfitterFields object', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInputNoOutfittersField,
						{}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields is a required field!');

				})
				.expect(400, done);

		});

	});

	describe('validate required fields present: applicantInfo fields', function(){

		it('should return valid json with a 400 status code for outfitters POST request without a firstName', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.firstName is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a lastName', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.lastName is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a dayPhone', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.dayPhone is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a dayPhone/areaCode', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.dayPhone.areaCode is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a dayPhone/number', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.dayPhone.number is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a dayPhone/type', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.dayPhone.type is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an emailAddress', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.emailAddress is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a mailingAddress', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.mailingAddress is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a mailingCity', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingState': 'OR',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.mailingCity is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a mailingState', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingZIP': 97321,
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.mailingState is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a mailingZIP', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'orgType':'Limited Liability Company'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.mailingZIP is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an orgType', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'applicantInfo': {
								'firstName': 'John',
								'lastName': 'Doe',
								'dayPhone': {
									'areaCode': 541,
									'number': 8156141,
									'extension': 0,
									'type': 'BUSINESS'
								},
								'emailAddress': 'test@email.org',
								'mailingAddress': 'ON ANW 0953',
								'mailingCity': 'ALBANY',
								'mailingState': 'OR',
								'mailingZIP': 97321
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('applicantInfo.orgType is a required field!');

				})
				.expect(400, done);

		});

	});

	describe('validate required fields present: outfitters fields', function(){

		it('should return valid json with a 400 status code for outfitters POST request without an activityDescription', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'locationDescription': 'string',
								'startDateTime': '2013-01-12',
								'endDateTime': '2013-01-19',
								'insuranceCertificate':'File on S3',
								'goodStandingEvidence':'File on S3',
								'operatingPlan':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.activityDescription is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a locationDescription', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
								'startDateTime': '2013-01-12',
								'endDateTime': '2013-01-19',
								'insuranceCertificate':'File on S3',
								'goodStandingEvidence':'File on S3',
								'operatingPlan':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.locationDescription is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without a startDateTime', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
								'locationDescription': 'string',
								'endDateTime': '2013-01-19',
								'insuranceCertificate':'File on S3',
								'goodStandingEvidence':'File on S3',
								'operatingPlan':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.startDateTime is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an endDateTime', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
								'locationDescription': 'string',
								'startDateTime': '2013-01-12',
								'insuranceCertificate':'File on S3',
								'goodStandingEvidence':'File on S3',
								'operatingPlan':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.endDateTime is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an insuranceCertificate', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
								'locationDescription': 'string',
								'startDateTime': '2013-01-12',
								'endDateTime': '2013-01-19',
								'goodStandingEvidence':'File on S3',
								'operatingPlan':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.insuranceCertificate is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an goodStandingEvidence', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
								'locationDescription': 'string',
								'startDateTime': '2013-01-12',
								'endDateTime': '2013-01-19',
								'insuranceCertificate':'File on S3',
								'operatingPlan':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.goodStandingEvidence is a required field!');

				})
				.expect(400, done);

		});

		it('should return valid json with a 400 status code for outfitters POST request without an operatingPlan', function(done) {

			request(server)
				.post('/permits/special-uses/commercial/outfitters')
				.set('x-access-token', token)
				.send(
					util.updateInputData(
						postInput,
						{
							'tempOutfitterFields': {
								'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
								'locationDescription': 'string',
								'startDateTime': '2013-01-12',
								'endDateTime': '2013-01-19',
								'insuranceCertificate':'File on S3',
								'goodStandingEvidence':'File on S3'
							}
						}
					)
				)
				.expect('Content-Type', /json/)
				.expect(function(res){

					expect(res.body.response.message).to.equal('tempOutfitterFields.operatingPlan is a required field!');

				})
				.expect(400, done);

		});

	});

});

describe('outfitters POST: required outfitters fields', function(){

	let token;

	before(function(done) {

		util.getToken(function(t){

			token = t;
			return done();

		});
	
	});

	it('should return valid json with a 400 status code for an invalid outfitters POST request', function(done) {

		request(server)
			.post('/permits/special-uses/commercial/outfitters')
			.set('x-access-token', token)
			.send(
				util.updateInputData(
					postInput,
					{
						'tempOutfitterFields': {
							'activityDescription': 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
							'locationDescription': 'string',
							'startDateTime': '2013-01-12',
							'endDateTime': '2013-01-19',
							'operatingPlan':'File on S3'
						}
					}
				)
			)
			.expect('Content-Type', /json/)
			.expect(function(res){

				expect(res.body.response.message).to.equal('tempOutfitterFields.insuranceCertificate and tempOutfitterFields.goodStandingEvidence are required fields!');

			})
			.expect(400, done);

	});

	it('should return valid json with all errors reported during validation', function(done){

		request(server)
			.post('/permits/special-uses/commercial/outfitters')
			.set('x-access-token', token)
			.send(
				util.updateInputData(
					postInputNoOutfittersField,
					{
						'region': 3,
						'forest': 50552,
						'district': 50552,
						'authorizingOfficerName': 'WILLIAM L.NOXON',
						'authorizingOfficerTitle': 'null',
						'applicantInfo': {
							'lastName': 'Doe',
							'dayPhone': {
								'areaCode': 541,
								'number': 8156141,
								'extension': 0,
								'type': 'BUSINESS'
							},
							'emailAddress': 'test@email.org',
							'mailingAddress': 'ON ANW 0953',
							'mailingCity': 'ALBANY',
							'mailingState': 'OR',
							'mailingZIP': 97321
						},
						'type': 'tempOutfitterGuide'
					}
				)
			)
			.expect('Content-Type', /json/)
			.expect(function(res){

				expect(res.body.response.message).to.equal('applicantInfo.firstName and applicantInfo.orgType and tempOutfitterFields are required fields!');

			})
			.expect(400, done);
	
	});

});

describe('API Routes: permits/special-uses/commercial/outfitters', function() {
	
	let token;

	before(function(done) {

		util.getToken(function(t){

			token = t;
			return done();

		});
	
	});
	
	it('should return valid json for outfitters GET request for id', function(done) {

		request(server)
			.get('/permits/special-uses/commercial/outfitters/1234567890')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(200, done);

	});

	it('should return valid json for outfitters PUT request for id', function(done) {

		request(server)
			.put('/permits/special-uses/commercial/outfitters/1234')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(200, done);

	});
	
	it('should return valid json for outfitters POST request', function(done) {

		request(server)
			.post('/permits/special-uses/commercial/outfitters')
			.set('x-access-token', token)
			.send(postInput)
			.expect('Content-Type', /json/)
			.expect(200, done);

	});

	it('should return valid json for outfitters POST request with apiRequest', function(done) {

		request(server)
			.post('/permits/special-uses/commercial/outfitters')
			.set('x-access-token', token)
			.send(postInput)
			.expect('Content-Type', /json/)
			.expect(function(res){
				expect(res.body).to.have.property('apiRequest');
			})	
			.expect(200, done);

	});

});
