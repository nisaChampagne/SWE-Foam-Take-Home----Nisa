const express=require('express');
const app=express();
const PORT=3200;
const aws = require('aws-sdk');
require('dotenv').config();
var cors = require('cors')

app.use(cors())

const mongoose = require('mongoose')
const photoModel = require("./model");

const url = process.env.MONGODBATLAS_URL;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION
          });

let params = {
    Bucket: process.env.BUCKET, 
    MaxKeys: 1000
};
let s3 = new aws.S3();

// INITIAL DB LOAD FROM S3 BUCKETS TO ALLOW FOR UPDATES
app.get('/api/images', (req, res) => {
    let images = [];
       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
       res.setHeader('Access-Control-Allow-Credentials', true);


s3.listObjectsV2(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else { 

        var href = this.request.httpRequest.endpoint.href;
        var bucketUrl = href + "take-home-foam-challenge" + '/';

        data.Contents.map(function(photo) { 
            var photoKey = photo.Key;
            var photoUrl = bucketUrl + encodeURIComponent(photoKey);
            images.push(photoUrl);
        }); 
    }

    console.log('SUCCESS HERE!')

    //db
    let photos = [];
    for ( let img of images){
        let photo = new photoModel({url: img, foamy: false});
        try{
            photo.save();
            photos.push(photo);
        }catch (error){
            res.status(500).send(error);
        }
    }

          
    res.send(photos);
});  

});

// RETURN ALL IMAGES FROM DB
app.get("/allImagesFromDB", async (req, res) => {
    const photos = await photoModel.find({});
  
    try {
      res.send(photos);
    } catch (error) {
      res.status(500).send(error);
    }
});  

// GET BY PAGE NUMBER
app.get("/getpage/:page", async (req, res) => {
    const resPerPage = 50;
    const page = req.params.page;
    const photos = await photoModel.find({})
                        .skip((resPerPage * page) - resPerPage)
                        .limit(resPerPage)

  
    try {
      res.send(photos);
    } catch (error) {
      res.status(500).send(error);
    }
});  

// UPDATE FOAMING STATUS OF PHOTO IN DB
app.post("/photo/:id/:foamy", async (req, res) => {
    try {
        let photoToUpdate = await photoModel.findById(req.params.id);
        
        const photo = photoToUpdate.set({"foamy": req.params.foamy})
        await photo.save();
        res.json(photo);
    } catch (error) {
        res.status(500).send(error);
    }
});  



app.listen(PORT,()=>{
    console.log(`Web Server running on port ${PORT}`);
});