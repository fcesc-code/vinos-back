const request = require('supertest');
const express = require('express');

const mockServer = express();

mockServer.use(express.urlencoded({ extended: false}));

const wineRoutes = require('./wineRouter');
const { expect } = require('chai');

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

  })

  describe('test post requests', () => { 
    const NEWWINE = {
        "_id": 33,
        "name": "OLMO",
        "year": 2015,
        "rating": 4.3,
        "grapes": "Tempranillo",
        "country": "Spain",
        "region": "Rioja",
        "description": "A strong flavor for a mock wine.",
        "price": 13.50, 
        "isOnSale": true, 
        "quantityInCart": 0, 
        "foodMatch": [
      {
        "name": "Jamón Ibérico",
        "kcal": 450,
        "vegan": false,
        "gluten": false
      }
    ], 
        "imageUrl": "some_wine_example.png"
    };
    
    it(`Test ${ROOT_ROUTES} route: success expected`, ()=>{
      request(mockServer)
        .post(`${ROOT_ROUTES}/`)
        .send( { ...NEWWINE } )
        .set('Accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200, {...NEWWINE})
        .end( (err, res) => {
          return (err) ? err : undefined;
        });
    })
  })

  
  describe('test patch requests', () => {   
    it(`Test ${ROOT_ROUTES} route: success expected`, ()=>{
      const patchedData = { _id: 34, quantityInCart: 3 };
      const expectedMsg = { msg: `Successfully updated cart for wine with id: 34.` };

      request(mockServer)
        .patch(`${ROOT_ROUTES}/`)
        .send( patchedData )
        .set('Accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200, expectedMsg)
        .end( (err, res) => {
          return (err) ? err : undefined;
        });
    })
  })

  describe('test delete requests', () => {   
    it(`Test ${ROOT_ROUTES}/3 route: success expected`, ()=>{
      const expectedMsg = { msg: `Wine with id:3 successfully deleted.` };

      request(mockServer)
        .delete(`${ROOT_ROUTES}/3`)
        .set('Accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200, expectedMsg)
        .end( (err, res) => {
          return (err) ? err : undefined;
        });
    })
  })


});