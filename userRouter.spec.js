const request = require('supertest');
const express = require('express');

const mockServer = express();

mockServer.use(express.urlencoded({ extended: false}));

const userRoutes = require('./userRouter');
const { expect } = require('chai');

const ROOT_ROUTES = '/api/user';
mockServer.use(`${ROOT_ROUTES}`, userRoutes);

describe('Test suit for user routes', () => {
  
  it(`Test ${ROOT_ROUTES} route: sign up success expected`, ()=>{
    const NEW_USER = {
      "John": "mockUserName"
    };

    request(mockServer)
      .post(`${ROOT_ROUTES}/register`)
      .send( { ...NEW_USER } )
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
  })

  it(`Test ${ROOT_ROUTES} route: sign up fail expected`, ()=>{
    const EXISTING_USER = {
      "mockUser": "mockPassword123"
    };

    request(mockServer)
      .post(`${ROOT_ROUTES}/register`)
      .send( { ...EXISTING_USER } )
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400)
  })

  it(`Test ${ROOT_ROUTES} route: sign in success expected`, ()=>{
    const EXISTING_USER = {
      "mockUser": "mockPassword123"
    };

    request(mockServer)
      .post(`${ROOT_ROUTES}/register`)
      .send( { ...EXISTING_USER } )
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
  })

  it(`Test ${ROOT_ROUTES} route: sign in fail expected`, ()=>{
    const FAKE_USER = {
      "Will": "crashesHisLogins"
    };

    request(mockServer)
      .post(`${ROOT_ROUTES}/register`)
      .send( { ...FAKE_USER } )
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400)
  })

});