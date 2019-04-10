module.exports = app => {
    app.get('/readflac', (req, res) => {
        require('../flac_management/flacRead.js');
        res.send({server: 'reading FLAC'});
    });
    app.get('/writeflac', (req, res) => {
        require('../flac_management/flacWrite.js');
        res.send({server: 'writing FLAC'});
    })
}