const request = require('supertest');
const express = require('express');

const mockServer = express();

mockServer.use(express.urlencoded({ extended: false}));

const wineRoutes = require('./wines');

const ROOT_ROUTES = '/api/wine';
mockServer.use(`${ROOT_ROUTES}`, wineRoutes);

describe('Test suit for wine routes', () => {

  describe('test get requests', () => { 
    const testRoutes = [
      { route: `${ROOT_ROUTES}/`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/3`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/89`, expected: 400, testType: 'fail', contentType: /json/ },
      { route: `${ROOT_ROUTES}/country/France`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/country/none`, expected: 400, testType: 'fail', contentType: /json/ },
      { route: `${ROOT_ROUTES}/grapes/Syrah`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/grapes/none`, expected: 400, testType: 'fail', contentType: /json/ },
      { route: `${ROOT_ROUTES}/year/2009`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/year/2023`, expected: 400, testType: 'fail', contentType: /json/ },
      { route: `${ROOT_ROUTES}/region/Washington`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/region/somewhere`, expected: 400, testType: 'fail', contentType: /json/ },
      { route: `${ROOT_ROUTES}/rating/4`, expected: 200, testType: 'success', contentType: /json/ },
      { route: `${ROOT_ROUTES}/rating/x`, expected: 400, testType: 'fail', contentType: /json/ }
    ]
  
    for (let testRoute of testRoutes){
      it(`Test ${testRoute.route} route: ${testRoute.testType} expected`, ()=>{
        request(mockServer)
          .get(testRoute.route)
          .expect('content-type', testRoute.contentType)
          .expect(testRoute.expected)
      })
    }

    // it('Test / route', ()=>{
    //   request(mockServer)
    //     .get(`${ROOT_ROUTES}/`)
    //     .expect('content-type', /json/)
    //     .expect(200)
    // })
  })

});