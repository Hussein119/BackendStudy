const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// This middleware in the stack before it is actully hits the functions that use it below.
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  const id = req.params.id * 1; // convert to number form string
  const arrSize = tours.length;
  if (id > arrSize || id < 0 || Number.isNaN(id)) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing name or price',
    });
  }
  next();
};

// ROUTE HANDLER
exports.getAllTours = (req, res) => {
  //  "(req, res) =>"  it is called route handler
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
};

exports.getTour = (req, res) => {
  //  "(req, res) =>"  it is called route handler
  // req.params -> Object Aoutmatically assigns the value to our variable. (the coming from the user in URL)
  // /api/v1/tours/:id/:x/:y -> /:y (required) , /:y? (optional)
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: tour,
  });
};

exports.createTour = (req, res) => {
  // req object is what holds all the data about the request that was done.
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 -> created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.findIndex((el) => el.id === id);
  tours.splice(tour, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  const newData = req.body;

  for (const property in newData) {
    if (property === 'id') {
      res.status(406).json({
        status: 'error',
        message: 'You can not change the id',
      });
    } else {
      const temp = `${newData[property]}`;
      tour[property] = temp;
    }
  }
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 -> created
      res.status(201).json({
        status: 'success',
        data: tour,
      });
    }
  );
};
