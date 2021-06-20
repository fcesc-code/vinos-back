const express = require('express');
const router = express.Router();

const wines = require('/winedata');
console.log('HERE', wines);

router.get('/', (req, res) => {
  const query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundWines = wines.filter(
      ({ name }) => name.toLowerCase().indexOf(query) !== -1
    );
    return res.status(200).json(foundWines);
  }
  return res.status(200).json(wines);
});

router.get('/:code', (req, res) => {
  const wineCode = +req.params.code;
  const foundWine = wines.find( ({ _id }) => _id === wineCode);

  return (foundWine) 
    ? res.status(200).json(foundWine)
    : res.status(400).json({msg: `Wine with code ${wineCode} not found!`});
});

function routerWithParams( parameter ){
  return (
      router.get(`/${parameter}/:value`, (req, res) => {
      const wineParameter = String(req.params.value);
      const filteredWines = wines.find( wine => String(wine[parameter]) === wineParameter);

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

router.post('/', (req, res) => {
  const wine = req.body;
  if (!wine._id) {
    wine = ({ ...wine, quantityInCart: 0, _id: wines.length + 1})
    wines.push(wine);
  };
  return (wine._id) 
    ? res
      .status(400)
      .json({ msg: `Wine seems to already have an id assigned` })
    : res
      .status(200)
      .json(wine);
});

router.patch('/:id', (req, res) => {
  const wineId = +req.params._id;
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

router.delete('/:id', (req, res) => {
  const wineId = +req.params._id;
  newWines = [ ...wines ].filter(({ _id }) => _id !== wineId);
  wines = newWines;
  return res.status(200).json({ msg: `Wine with id:${wineId} successfully deleted.` })
})

module.exports = router;

// comprobar con postman las rutas
// realizar testing
