const fs = require('fs');
const flac = require('flac-metadata');

// console.log(__dirname);
// const filename = "/home/ouce/Desktop/muslibJS/testflac/mind3.FLAC";
// const reader = fs.createReadStream(filename);
// var processor = new flac.Processor({ parseMetaDataBlocks: true });
// processor.on("postprocess", function(mdb) {
//     // for(let i=0; mdb.length; i++){
//     //     console.log(mdb[i]);
//     // }
//   // console.log(mdb);
//   console.log(mdb.comments);
// });

// reader.pipe(processor);

exports.flacRead = async (filePath) => {
  console.log(filePath);
  const filename = filePath;
  const reader = fs.createReadStream(filename);
  let comments = [];
  var processor = new flac.Processor({ parseMetaDataBlocks: true });
  processor.on("postprocess", function(mdb) {
    console.log(mdb.comments);
    console.log(filename, 'part', mdb.type, mdb.isLast);
    comments.push(mdb.comments);
    
  });
  processor.on('finish', function(){
    console.log(filename, 'finished')
  })
  reader.pipe(processor);
  reader.on('finish', (err) => {
      if(err) {
        this.log.push("An error occured while tagging a file".red.bold);
        callback(err, null);
      }
      else {
        callback(null, null);
      }
  });
  // stream.on('close', () => {
  //   console.log('finished');
  //   return comments;

  // })
}





