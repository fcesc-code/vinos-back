# Vinos

## Purpose
The aim of this wine-exercise is to build a small wine app, as part of a University 
[Web apps and sites development Master](https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio) 
by [Universitat Oberta de Catalunya](http://uoc.edu). \
Subject: Front-end with frameworks JS I. June 2021. \
This is a simple back-end application for this other [project](https://github.com/fcesc-code/vinos-front#readme).

## Repo
A Git repository can be found in this Github [repo](https://github.com/fcesc-code/vinos-back.git).

## Tech stack
- [node](https://nodejs.org)
- [express](https://expressjs.com/) as a server for backend
- [nodemon](https://nodemon.io/) for hot reloading in dev environment
- [chalk](https://github.com/chalk/chalk#readme) to improve console messages in backend server
- [body-parser](https://github.com/expressjs/body-parser#readme) as middleware for parsing the body of http requests
- [cors](https://github.com/expressjs/cors#readme) as middleware to allow cors in express
- [supertest](https://github.com/visionmedia/supertest#readme) to test the express router
- [mocha](https://mochajs.org/) as test runner
- [sinon](https://sinonjs.org/) for spies, stubs and mocks
- [chai](https://www.chaijs.com/) as assertion library
- [sinon-chai](https://github.com/domenic/sinon-chai#readme) sinon assertions (spy, stubs and mocks) for chai
- [nyc](https://github.com/istanbuljs/nyc) for coverage reportnyc 
- [github](https://github.com/)
- [sonarqube](https://www.sonarqube.org/)
- [VSCode](https://code.visualstudio.com/)
- [HTML](https://html.spec.whatwg.org/)

## Quality gate
[Mocha](https://mochajs.org/): 17 tests passed \
[Sonarqube](https://www.sonarqube.org/): 0 bugs | 0 code smells | 0 vulnerabilities | 0 security hotspots | 0% code duplication (excluding duplicated API file requested to separate deliverables) \

## Development server
Server opens at http://localhost:3010/.

## Running unit tests
npm run test -> run all tests and generate coverage report
npm run test-watch -> run all tests and watch for changes
npm run test-single \[yourTestFile\] -> run a single test file
npm run test-single-watch \[yourTestFile\] -> run a single test file and watch for changes
npm run test-clean -> removes all coverage report files and directories

## Credits
Assistant professor [Carlos Caballero](https://www.carloscaballero.io/about/)

## Author
Francesc Brugarolas, [repo](https://github.com/fcesc-code/)\
\
June 2021