const Location = require('../models/location.model');

const readAll = (req, res) => {

    Location.find().populate('part')
        .then(data => {
            console.log(data);

            if(data.length > 0){
                return res.status(200).json(data);
            }
            else {
                return res.status(404).json('None found');
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
};

const readOne = (req, res) => {
    let id = req.params.id;

    Location.findById(id).populate('part')
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Location with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Location with id: ${id} retrieved`,
                data
            });
        })
        .catch(err => {
            console.log(err);

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Location with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Location.create(body)
        .then(data => {
            console.log(`New location created`, data);

            return res.status(201).json({
                message: "Location created",
                data
            });
        })
        .catch(err => {
            console.log(err);

            if(err.name === 'ValidationError'){
                return res.status(422).json(err)
            }

            return res.status(500).json(err);
        });
};

const updateData = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Location.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
    .then(data => {
           
            if(data){
                return res.status(201).json(data);
            }

            return res.status(404).json({
                message: `Location with id: ${id} not found`
            })
        })
    .catch(err => {

        if(err.name === 'CastError'){

            if(err.kind === 'ObjectId'){
                return res.status(404).json({
                    message: `Location with id: ${id} not found`
                });
            }
            else {
                return res.status(422).json({
                    message: err.message
                });
            }

        }

        return res.status(500).json(err);
    });
};

const deleteData = (req, res) => {
    let id = req.params.id;

    Location.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Location with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Location with id: ${id} deleted`
            });
        })
        .catch(err => {

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Location with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });
};

module.exports = {
    readAll,
    readOne,
    createData,
    updateData,
    deleteData
};