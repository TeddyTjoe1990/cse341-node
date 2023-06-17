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
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update Contact
const updateData = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
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
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete Contact
const deleteData = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('Contacts')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createData,
  updateData,
  deleteData
};
