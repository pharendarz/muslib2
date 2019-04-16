const flacMgt = require('../flac_management/flacMgt');
const flacRead = require('../flac_management/flacRead.js');

module.exports = app => {
    app.post('/readflac', async (req, res) => {
        // console.log(req.body.songPath);
        const metadata = await flacRead.flacRead(req.body.songPath);
        //if (metadata)
        console.log('metadata:', metadata);
        // if (metadata.length === 0) 
        //     res.send({metadata: []});
        // else 
            res.send({metadata: metadata});
    });
    app.get('/writeflac', (req, res) => {
        require('../flac_management/flacWrite.js');
        res.send({server: 'writing FLAC'});
    });
    app.post('/readdrive', async (req, res) => {
        console.log('before read');
        const songs = await flacMgt.readDrive().catch(()=>{
            console.log('ERRORRRRRRRRRRRRRRR');
          });
        console.log('after read');

        const readFlacs = (req.body.readTags.toString() === 'true');
        
        if(readFlacs){
            console.log('reading drive and flacs...');
            for (let i=0; i<songs.length; i++){
                // // console.log('alltag', songs[i]);
                //const metadata = await flacRead.flacRead(songs[i])
                //res.send({readAllFlac: true});
            }
            res.send({readAllFlac: true});
            // songs.foreach(song => {
            //     console.log(song);
            // })
        }
        res.send({songs: songs});
    });
}