const express = require('express');
const router = express.Router();

const wines = require('./winedata');

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundWines = wines.filter(
      ({ name }) => name.toLowerCase().indexOf(query) !== -1
    );
    return res.status(200).json(foundWines);
  }
  return res.status(200).json(wines);
});

router.post('/', (req, res) => {
  let wine = req.body;

  if (wine.id) {
    return res
      .status(400)
      .json({ msg: 'Wine seems to already have an id assigned' });
  }

  wine.id = wines.length + 1;
  wine.quantityInCart = 0;
  wines.push(wine);
  return res.status(200).json(wine);
});

router.patch('/:id', (req, res) => {
  const wineId = req.params.id;
  const foundWine = wines.find(({ id }) => id == wineId);
  if (foundWine) {
    const changeInQuantity = req.body.changeInQuantity;
    foundWine.quantityInCart += changeInQuantity;
    return res.status(200).json({ msg: 'Successfully updated cart' });
  }
  return res
    .status(400)
    .json({ msg: 'Wine with id ' + wineId + ' not found.' });
});

module.exports = router;
