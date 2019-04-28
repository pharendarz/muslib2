const mongoose = require('mongoose');
//app
const flacMgt = require('../flac_management/flacMgt.js');
const flacRead = require('../flac_management/flacRead.js');
const flacWrite = require('../flac_management/flacWrite.js');
const appPaths = require('../general_setup/appPaths');
//db
const albums = require('../mongoModels/Albums');
module.exports = app => {
    app.post('/readflac', async (req, res) => {
        const metadata = await flacRead.flacRead(req.body.filePath);
        console.log('metadata:', metadata);
        res.send({metadata: metadata});
    });
    app.post('/writeflac', async (req, res) => {
        const metadata = await flacRead.flacRead(req.body.filePath);
        flacWrite.flacWrite(req.body.filePath, metadata, req.body.newTags);
    });
    app.post('/readdrive', async (req, res) => {
        console.log('before read');
        console.log(req.body.startLocation);
        const songs = await flacMgt.readDrive(req.body.startLocation).catch(()=>{
            console.log('ERRORRRRRRRRRRRRRRR');
          });
        console.log('after read');
        //const readFlacs = (req.body.readTags.toString() === 'true');
        res.send({filePaths: songs});
    });
    app.get('/getpaths', (req, res) => {
        res.send({appPaths: appPaths.appPaths})
    });
    //DATABASE
    app.post('/api/albums/create', async (req, res) => {
        // Tags.findOne({ name: req.body.name }).then(existingId => {
            // if (existingId) {
            //     // albums.update(Tags, existingId.id, req.body);
            // } else {      
            const item = {
                indexAlbum: req.body.indexAlbum,
                title: req.body.title,
                artist: req.body.artist,
                filePath: req.body.filePath,
            }          
                await albums.create(item);
                // res.send({createTag: "ok"});
            // }        
        // })
    });
    app.get('/api/albums/all', async (req, res) => {
        const Albums = await mongoose
            .model('albums')
            .find()
            // .limit(pageLimit)
            // .sort({'publishDate': -1})
            .select({ __v: false });
        res.send(Albums);            
    });
}