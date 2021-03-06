const mongoose = require('mongoose');
const path = require('path');
//app
const flacMgt = require('../flac_management/flacMgt.js');
const driveMgt = require('../drive_management/driveMgt');
const flacRead = require('../flac_management/flacRead.js');
const flacWrite = require('../flac_management/flacWrite.js');
const appPaths = require('../general_setup/appPaths');
const csvMgt = require('../drive_management/csvMgt');
//db
const albums = require('../mongoModels/Albums');
const globalSetup = require('../mongoModels/GlobalSetup');

module.exports = app => {
    app.post('/readflac', async (req, res) => {
        const metadata = await flacRead.flacRead(req.body.filePath);
        // console.log('metadata:', metadata);
        res.send({metadata: metadata});
    });




    app.post('/writeflac', async (req, res) => {
        const metadata = await flacRead.flacRead(req.body.filePathDump);
        const songStoreData = req.body;
        console.log(songStoreData);
        flacWrite.flacWrite(songStoreData, metadata, req.body.newTags);
    });




    app.post('/readdrive', async (req, res) => {
        console.log('before read');
        console.log(req.body.startLocation);
        const songs = await flacMgt.readDrive(req.body.startLocation).catch(()=>{
            console.log('ERRORRRRRRRRRRRRRRR');
          });
        console.log('after read');
        //const readFlacs = (req.body.readTags.toString() === 'true');
        res.send({readFiles: songs});
    });
    app.get('/getpaths', (req, res) => {
        res.send({appPaths: appPaths.appPaths})
    });
    //DATABASE
    //single usage
    app.get('/api/globalSetup/createSetup', (req, res) => {
        let counter = 0;
        globalSetup.createSetup();
        res.send({ server: 'creating setup' });
    });
    //multiple usage
    //global setup
    app.get('/api/globalSetup/updateLastNumberIndexAlbum', async (req, res) => {
        let GlobalSetup = await mongoose
            .model('globals')
            .find({setupId: 1})
            .select({ setupId: false });

        const nextNumberIndexAlbum = GlobalSetup[0].lastNumberIndexAlbum  + 1;
        await globalSetup.updateLastNumberIndexAlbum('5cc6b8023bdd5724d37f07e8', nextNumberIndexAlbum);

        GlobalSetup = await mongoose
            .model('globals')
            .find({setupId: 1})
            .select({ setupId: false });
        const lastNumberIndexAlbum = GlobalSetup[0].lastNumberIndexAlbum;
        res.send({lastNumberIndexAlbum: lastNumberIndexAlbum});
    })
    //albums
    app.post('/api/albums/create', async (req, res) => {
        // Tags.findOne({ name: req.body.name }).then(existingId => {
            // if (existingId) {
            //     // albums.update(Tags, existingId.id, req.body);
            // } else {
                const item = req.body.data;      
                await albums.create(item);
                res.send({createdAlbum: item});
            // }        
        // })
    });
    //purgatory 
    app.post('/api/purgatory/create_mirror', async (req, res) => {
        const paths = req.body;      
        console.log('req.body.data:::', req.body);
        await driveMgt.createFolderMirrorFiles(
            paths.dumpAlbumPath, paths.purgAlbumPath
        );
        res.send({purgatoryPath: 'lol'});
    });



    //purgatory > write to csv
    app.post('/api/purgatory/write_album_csv', async (req, res) => {
        const data = req.body;    
        const purgatoryAlbumPath = path.dirname(data.csvDataObj.FilePathPurgatory);
        // console.log('req.body.data:::', data.csvDataObj, purgatoryAlbumPath);
        csvMgt.writeToCsv('purgatory', purgatoryAlbumPath, data.csvDataObj, data.indexKey);
        res.send({csvWrite: 'lol'});
    });

    app.post('/api/purgatory/write_album_csv_change', async (req, res) => {
        const data = req.body;    
        const purgatoryAlbumPath = path.dirname(data.csvDataObj.FilePathPurgatory);
        // console.log('req.body.data:::', data.csvDataObj, purgatoryAlbumPath);
        const newCsvRows = await csvMgt.writeToCsvChangeRecord('purgatory', purgatoryAlbumPath, data.csvDataObj, data.indexKey, data.FilePathPurgatory);
        res.send({newCsvRows: newCsvRows});
    });

    //purgatory > read from csv
    app.post('/api/purgatory/read_album_csv_return_dump_path', async (req, res) => {
        const purgatoryPath = req.body.purgatoryPath;    
        const purgatoryAlbumPath = path.dirname(purgatoryPath);
        // console.log('req.body.data:::', purgatoryAlbumPath);
        const dumpPath = await csvMgt.readFromLocalAlbumCsv_returnDumpPath(purgatoryAlbumPath, purgatoryPath);
        res.send({dumpPath: dumpPath});
    });
    //


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