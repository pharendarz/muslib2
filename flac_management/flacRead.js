const fs = require('fs');
const flac = require('flac-metadata');

const desiredMetadataElements = {
  Album: "album=",
  AlbumArtist: "albumartist=",
  Artist: "artist=",
  Date: "date=",
  Genre: "genre=",
  IndexTrack: "indextrack=",
  IndexAlbum: "indexalbum=",
  Label: "label=",
  Rating: "rating=",
  Title: "title=",
  Style: "style=",
}
function cleanLists(lists){
  return lists.reduce((a, b) => a.concat(b), []).filter(value => value !== undefined)
}
function flattenAndClean(lists) {
  const cleanedList = cleanLists(lists);
  let metatagsArray = [];

  Object.keys(desiredMetadataElements).forEach(e => {
    for(let i=0; i < cleanedList.length ; i++){
      let searchText = cleanedList[i].toLowerCase().search(desiredMetadataElements[e]);

      if (searchText !== -1) {
        //console.log(searchText, desiredMetadataElements[e], cleanedList[i]);
        let searchEqual = cleanedList[i].search('=');
        if (searchEqual !== -1){
          let value = cleanedList[i].substr(searchEqual + 1, cleanedList[i].length)
          //console.log(value);
          
          let newObj = {
            [e]: value
          };
          metatagsArray.push(newObj);
        }
      }
    } 
  });
  // // console.log(metatagsArray);
  return metatagsArray;
  // const flattened =  lists.reduce((a, b) => a.concat(b), []);
  // console.log('flattened', flattened);
  // const filtered = flattened.filter(value => value !== undefined);
  // console.log('filtered', filtered);

}
const metadataFromFlacToArray = () => {

}
exports.flacRead = async (filePath) => {
  
  return new Promise(async (resolve, reject) => {
    // console.log(filePath);
    const ReadSingleFile = await new Promise((resolve, reject) => {

      const filename = filePath;
      const reader = fs.createReadStream(filename);
      let comments = [];
      let tagSectionCounter = 0;
      console.log('===================probe=================');
      var processor = new flac.Processor({ parseMetaDataBlocks: true });
      processor.on("postprocess", function(mdb) {
        tagSectionCounter += 1;
        comments.push(mdb.comments);
        console.log( 'ISTRUE LAST:', mdb.isLast , 'SECTION: ', tagSectionCounter, 'COMMENTS:', comments);
        if (mdb.isLast && comments.length !== 0) {
          resolve(flattenAndClean(comments));
        } else {
          const clean = cleanLists(comments);
          console.log('CLEAN LIST:', clean);
          if (!mdb.isLast && tagSectionCounter >= 3 && clean.length !== 0){;
              resolve(flattenAndClean(clean))
            }
  
        }
      });
      reader.pipe(processor);
      console.log('===================probe2==============');
    })

    // console.log(ReadSingleFile);
    // resolve();

    Promise.all(ReadSingleFile).then(()=>{
      if (ReadSingleFile.length !== 0){
        console.log('READ FILE = ', ReadSingleFile);

      }
        resolve(ReadSingleFile);
    });
    // }).catch(console.log('error'));

    // await ReadSingleFile.then(resolve(comments => comments)).catch(err => console.log(err));
  })
  
}

  