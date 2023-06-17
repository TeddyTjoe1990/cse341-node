const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contact');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createData);

router.put('/:id', contactsController.updateData);

router.delete('/:id', contactsController.deleteData);

module.exports = router;
