const express = require('express');
const router = express.Router();

const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/part.controller');

const { loginRequired } = require('../controllers/user.controller');


router.get('/', readAll);
//redOne is protected and requires the uesr to be logged in
router.get('/:id', loginRequired, readOne);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;