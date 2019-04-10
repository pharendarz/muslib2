const fs = require('fs');
const flac = require('flac-metadata');

console.log(__dirname);
const filename = "/home/ouce/Desktop/muslibJS/testflac/mind3.FLAC";
const reader = fs.createReadStream(filename);
var processor = new flac.Processor({ parseMetaDataBlocks: true });
processor.on("postprocess", function(mdb) {
    // for(let i=0; mdb.length; i++){
    //     console.log(mdb[i]);
    // }
  console.log(mdb);
  // console.log(mdb.comments);
  console.log('asd');
});

reader.pipe(processor);






