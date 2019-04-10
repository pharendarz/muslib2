const flacMgt = require('../flac_management/flacMgt');
const flacRead = require('../flac_management/flacRead.js');
module.exports = app => {
    app.post('/readflac', async (req, res) => {
        console.log(req.body.songPath);
        const comments = await flacRead.flacRead(req.body.songPath)
        res.send({comments: comments});
    });
    app.get('/writeflac', (req, res) => {
        require('../flac_management/flacWrite.js');
        res.send({server: 'writing FLAC'});
    });
    app.get('/readdrive', (req, res) => {
        const songs = flacMgt.readDrive();
        res.send({songs: songs});
    })
}