// const multer = require('multer');
// const path = require('path');
// // const S3Client = require('@aws-sdk/client-s3');

// if(process.env.STORAGE_ENGINE === "S3"){
//     const s3 = new S3Client({
//         region: process.env.MY_AWS_REGION,
//         credentails: {
//             accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
//         },
//         key: function(req, file, cb){
//             cb(null, Date.now() + path.extname(file.originalname))
//         }
//     })
// } else {
//     storage = multer.diskStorage({
//         destination: function(req, file, cb){
//             cb(null, 'public/uploads');
//         },
//         filename: function(req, file, cb){
//             cb(null, Date.now() + path.extname(file.originalname));
//         }
//     });
// }

// const fileFilter = (req, file, cb) => {
//     if(!file){
//         return cb(null, false);
//     } else if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
//         return cb(new Error('Image must be jpg, jpeg, png or gif format'), false);
//     } else{
//         return cb(null, true);
//     }
// };

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'public/uploads');
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// module.exports = multer({
//     fileFilter,
//     storage
// });