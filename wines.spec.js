const request = require('supertest');
const express = require('express');

const mockServer = express();

mockServer.use(express.urlencoded({ extended: false}));

const wineRoutes = require('./wines');
const { join } = require('./winedata');

const ROOT_ROUTES = '/wine';
mockServer.use(`${ROOT_ROUTES}`, wineRoutes);

describe('Test suit for wine routes', () => {

  describe('test get requests', () => {
    it('Test / route', ()=>{
      request(mockServer)
        .get(`${ROOT_ROUTES}/`)
        .expect('content-type', /json/)
        .expect(200)
    })
  
    const testRoutes = [
      { route: `${ROOT_ROUTES}/3`, expected: 200, contentType: /json/ },
      { route: `${ROOT_ROUTES}/89`, expected: 400, contentType: /json/ },
      { route: `${ROOT_ROUTES}/country/France`, expected: 200, contentType: /json/ },
      { route: `${ROOT_ROUTES}/country/none`, expected: 400, contentType: /json/ },
      { route: `${ROOT_ROUTES}/grapes/Syrah`, expected: 200, contentType: /json/ },
      { route: `${ROOT_ROUTES}/grapes/none`, expected: 400, contentType: /json/ },
      { route: `${ROOT_ROUTES}/year/2009`, expected: 200, contentType: /json/ },
      { route: `${ROOT_ROUTES}/year/2023`, expected: 400, contentType: /json/ },
      { route: `${ROOT_ROUTES}/region/Washington`, expected: 200, contentType: /json/ },
      { route: `${ROOT_ROUTES}/region/somewhere`, expected: 400, contentType: /json/ },
      { route: `${ROOT_ROUTES}/rating/4`, expected: 200, contentType: /json/ },
      { route: `${ROOT_ROUTES}/rating/x`, expected: 400, contentType: /json/ }
    ]
  
    for (let route of testRoutes){
      it('Test /:id route success', ()=>{
        request(mockServer)
          .get(route.route)
          .expect('content-type', route.contentType)
          .expect(route.expected)
      })
    }

  })

  describe('')

})

j.eloisanchez@gmaildotcom

Factory Pal Gmbh