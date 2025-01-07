const Part = require('../models/part.model');
const fs = require('fs');

const deleteImage = (filename) => {
    let path = `public/uploads/${filename}`;
    fs.access(path, fs.constants.F_OK,(err)=>{
        if(err){
            console.error(err);
            return;
        }
        fs.unlink(path, err => {
            if(err){
                console.error(err);
                return;
            }

            console.log(`${filename} was deleted`)
        })
    })
}
const readAll = (req, res) => {

    Part.find()
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

    Part.findById(id)
        .then(data => {

            if(data){
               // data.image_path = process.env.IMAGE_URL + data.image_path;
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Part with id: ${id} not found`
                });
            }
            
        })
        .catch(err => {
            console.log(err);

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Part with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    // if(req.file){
    //     body.image_path = process.env.STORAGE_ENGINE ==='S3' ? req.file.key : req.file.filename;
    // }

    Part.create(body)
        .then(data => {
            console.log(`New part created`, data);

            return res.status(201).json({
                message: "Part created",
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

    // if(req.file){
    //     body.image_path = process.env.STORAGE_ENGINE ==='S3' ? req.file.key : req.file.filename;
    // }

    Part.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
    .then(data => {
            return res.status(201).json(data);
        })
    .catch(err => {

        if(err.name === 'CastError'){

            if(err.kind === 'ObjectId'){
                return res.status(404).json({
                    message: `Part with id: ${id} not found`
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

    Part.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Part with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Part with id: ${id} deleted`
            });
        })
        // .then(()=>{
        //     if(filename){
        //         deleteImage(filename);
        //     }
        //     return res.status(200).json({
        //         message:`Part with id ${id} deleted successfully`
        //     })
        // })
        .catch(err => {

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Part with id: ${id} not found`
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