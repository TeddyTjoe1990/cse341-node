// const express = require('express');
const ObjectID = require('mongodb').ObjectId;
const mongoDB = require('../db/connectdb');

const getAll = async (req, res) => {
   try {
      const result = await mongoDB.getDb().db('CSE341').collection('Contacts').find();

      if (result) {
         result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
         });
         console.log(`Found contacts in the collection`);
      } else {
         console.log(`No contacts found in the collection`);
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

const getSingle = async (req, res) => {
   try {
      const userID = new ObjectID(req.params.id);
      const result = await mongoDB
         .getDb()
         .db('CSE341')
         .collection('Contacts')
         .find({ _id: userID });

      if (result) {
         result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
         });

         console.log(`Found contact in the collection with the ID '${userID}':`);
         // console.log(result);
      } else {
         console.log(`No contacts found with the ID: '${userID}'`);
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const createData = async (req, res) => {
   try {
      const newContact = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         favoriteColor: req.body.favoriteColor,
         birthday: req.body.birthday
      };

      const result = await mongoDB
         .getDb()
         .db('CSE341')
         .collection('Contacts')
         .insertOne(newContact);

      if (result.acknowledged) {
         res.status(201).json(result);
         console.log(`New contact created with new ID: ${result.insertedId}`);
      } else {
         res.status(500).json(result.error || 'An error occurred while creating the contact.');
         console.log('An error occurred while creating the contact');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const updateData = async (req, res) => {
   try {
      const userID = new ObjectID(req.params.id);

      const newContact = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         favoriteColor: req.body.favoriteColor,
         birthday: req.body.birthday
      };

      const result = await mongoDB
         .getDb()
         .db('CSE341')
         .collection('Contacts')
         .replaceOne({ _id: userID }, newContact);

      if (result.modifiedCount > 0) {
         res.status(204).send();
         console.log(`Contact updated with user ID: ${userID}`);
      } else {
         res.status(500).json(result.error || 'An error occurred while updating the contact.');
         console.log('An error occurred while updating the contact');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const deleteData = async (req, res) => {
   try {
      const userID = new ObjectID(req.params.id);

      const result = await mongoDB
         .getDb()
         .db('CSE341')
         .collection('Contacts')
         .deleteOne({ _id: userID });

      if (result.deletedCount > 0) {
         res.status(200).send();
         console.log(`Contact deleted with user ID: ${userID}`);
      } else {
         res.status(500).json(result.error || 'An error occurred while deleting the contact.');
         console.log('An error occurred while deleting the contact');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

module.exports = { getAll, getSingle, createData, updateData, deleteData };