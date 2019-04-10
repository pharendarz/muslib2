const flacMgt = require('../flac_management/flacMgt');

module.exports = app => {
    app.get('/readflac', (req, res) => {
        require('../flac_management/flacRead.js');
        res.send({server: 'reading FLAC'});
    });
    app.get('/writeflac', (req, res) => {
        require('../flac_management/flacWrite.js');
        res.send({server: 'writing FLAC'});
    });
    app.get('/readdrive', (req, res) => {
        flacMgt.readDrive();
        res.send({server: 'reading drive'});
    })
}