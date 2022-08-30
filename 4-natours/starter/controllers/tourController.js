const fs = require('fs');

const Tour = require('../modules/tourModel');

exports.prepareTop5Tours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    ['page', 'sort', 'limit', 'fields'].forEach((el) => delete queryObject[el]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      query = query.select(req.query.fields.split(',').join(' '));
    } else {
      query = query.select('-__v');
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const tours = await query;

    if (tours.length > 0) {
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours: tours,
        },
      });
    } else {
      res.status(404).json({
        status: 'page_not_found',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'failed',
      message: 'Something wrong',
    });
  }
};

exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failed',
      message: 'Missing parameters',
    });
  }
};

exports.updateTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    requiredValidators: true,
  });
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json();
};
