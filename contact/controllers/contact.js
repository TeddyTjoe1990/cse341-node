const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all data from the database
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('CSE341').collection('Contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// gets single data from the database
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('CSE341').collection('Contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// create new contact in the database
const createData = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db('CSE341').collection('Contacts').insertOne(contact);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred! Contact not created!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update contact by id in the database
const updateData = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('Contacts')
      .updateOne({ _id: userId }, { $set: contact });
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteData = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('Contacts')
      .deleteOne({ _id: userId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createData,
  updateData,
  deleteData
};
