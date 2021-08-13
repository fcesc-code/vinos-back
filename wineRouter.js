const express = require('express');
const wineRouter = express.Router();
const chalk = require('chalk');

const winesData = require('./WINEDATA');
let wines = [ ...winesData ];

wineRouter.get('/', (req, res) => {
  const query = (req.query['q'] || '').toLowerCase();
  console.log(`/api/wine/'${chalk.green(`route called with get, query: '${query}'`)}`)
  if (query) {
    const foundWines = wines.filter(
      ({ name }) => name.toLowerCase().indexOf(query) !== -1
    );
    return res.status(200).json(foundWines);
  }
  return res.status(200).json(wines);
});

wineRouter.get('/page/:pageNumber', (req, res) => {
  const page = +req.params.pageNumber;
  console.log(`/api/wine/page/:pageNumber'${chalk.green(`route called with get, page: ${page}`)}`)
  const itemsPerPage = 10;
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedWines = [ ...wines ].slice( start, end );

  return (paginatedWines) 
    ? res.status(200).json(paginatedWines)
    : res.status(400).json({msg: `Wine with id: ${page} not found!`});
});

wineRouter.get(`/:id`, (req, res) => {
  const wineId = +req.params.id;
  console.log(`/api/wine/:id'${chalk.green(`route called with get, ${wineId}`)}`)
  const filteredWines = wines.find( ({ _id }) => +_id === wineParameter);

  return (filteredWines) 
    ? res.status(200).json(filteredWines)
    : res.status(400).json({msg: `Wine with id: ${wineParameter} not found!`});
});

function routerWithParams( parameter ){
  return (
      wineRouter.get(`/${parameter}/:value`, (req, res) => {
      const wineParameter = String(req.params.value);
      console.log(`/api/wine/${parameter}/:value' ${chalk.green(`route called with get, ${wineParameter}`)}`)
      const filteredWines = wines.filter( wine => String(wine[parameter]) === wineParameter);

      return (filteredWines) 
        ? res.status(200).json(filteredWines)
        : res.status(400).json({msg: `Wine with ${parameter} ${wineParameter} not found!`});
    })
  )
}

routerWithParams('country');
routerWithParams('year');
routerWithParams('rating');
routerWithParams('region');
routerWithParams('grapes');

wineRouter.post('/', (req, res) => {
  let wine = req.body;
  wine.name = wine.name.trim().toUpperCase();
  const foundWine = wines.findIndex( ({ name }) => name === wine.name );
  if (foundWine === -1) {
    const DEFAULT_IMGURL = 'wine_example.png';
    // if( wine.imgUrl.trim() === '' ) wine.imgUrl = DEFAULT_IMGURL;
    wine.imgUrl = DEFAULT_IMGURL;
    wine = ({ ...wine, quantityInCart: 0, _id: wines.length + 1})
    wines.push(wine);
  };
  return (foundWine !== -1) 
    ? res
      .status(400)
      .json({ msg: `Wine seems to already have an id assigned` })
    : res
      .status(200)
      .json(wine);
});

wineRouter.patch('/:id', (req, res) => {
  const wineId = +req.params._id;
  console.log(`/api/wine/:id'${chalk.green(`route called with patch, ${wineId}`)}`)
  const foundWine = wines.find(({ _id }) => _id === wineId);
  if (foundWine) {
    const changeInQuantity = +req.body.changeInQuantity;
    foundWine.quantityInCart += changeInQuantity;
  }
  return (foundWine)
    ? res
      .status(200)
      .json({ msg: `Successfully updated cart for wine with id: ${wineId}.` })
    : res
      .status(400)
      .json({ msg: `Wine with id ${wineId} not found.` });
});

wineRouter.patch('/edit/', (req, res) => {
  console.log(`/api/wine/edit/'${chalk.green('route called with patch')}`)
  let updatedWine = req.body;
  if (updatedWine._id) {
    foundWine = wines.find( ({ _id}) => _id === updatedWine._id );
    for( let prop in foundWine ){
      foundWine[prop] = updatedWine[prop];
    }
  };
  return (foundWine)
    ? res
      .status(200)
      .json({ msg: `Successfully updated wine with id: ${wine._id}.` })
    : res
      .status(400)
      .json({ msg: `Wine with id ${wineId} not found. Update operation failed.` });
});

wineRouter.delete('/:id', (req, res) => {
  const wineId = +req.params._id;
  console.log(`/api/wine/:id'${chalk.green(`route called with delete, ${wineId}`)}`)
  newWines = [ ...wines ].filter(({ _id }) => _id !== wineId);
  wines = newWines;
  return res.status(200).json({ msg: `Wine with id:${wineId} successfully deleted.` })
})

module.exports = wineRouter;
