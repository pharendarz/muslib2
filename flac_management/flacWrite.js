// dependencies
const path = require('path');
var fs = require("fs");
var flac = require("flac-metadata");
// app
const appPaths = require('../general_setup/appPaths');
const csvMgt = require('../drive_management/csvMgt');


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


const _createArrayOfTags = (metadata ) => {
  const flattenedObject = {};
  
  metadata.forEach((obj, i) => {
    key = Object.keys(obj)[0];
    // value = 
    console.log(obj);
    flattenedObject[key] = obj[key];
  });
  
  let arrayOfTags = [];

  Object.keys(flattenedObject).forEach((key, i) => {
    //check if metadata belongs to requirements
    if (desiredMetadataElements.hasOwnProperty(key)){
      arrayOfTags.push(desiredMetadataElements[key].toUpperCase() + flattenedObject[key]);
    } else
      console.log(`ERROR_`, key);


  })

  return arrayOfTags;
    //flattenedArray.hasOwnProperty
}
const _changeValueInKey = (oldMetadata, keyName, changeValue) => {

  let keyIndex = null;

  for(let i=0; i < oldMetadata.length ; i++){
    const key = Object.keys(oldMetadata[i])[0];

    if(key === keyName){
      keyIndex = i;
      let obj = {};
      obj[keyName] = changeValue;
      oldMetadata[keyIndex] = obj;
      break;
    }
  }

  return oldMetadata;
}

exports.flacWrite = (songStoreData, oldMetadata, newComments) => {
  // read stream from dump
  var reader = fs.createReadStream(songStoreData.filePathDump);
  // write file with new tags in purgatory
  var writer = fs.createWriteStream(songStoreData.filePathPurgatory);
  var processor = new flac.Processor();

  var vendor = "JabbaLibrary 1.0";
  // TESTING ONE TAG
  console.log(`\u001b[1;35m Old Metadata`);
  console.log(oldMetadata);

  // [TODO] write metadata to purgatory album _local.csv file
  let newMetadata = _changeValueInKey(oldMetadata, 'Rating', 'JL_4');
  newMetadata = (_createArrayOfTags(oldMetadata));

  console.log(`\u001b[1;34m New Metadata`);
  console.log(newMetadata);

  let csvDataObj = {
    JabbaID: 'not_necessary',
    FileClearedDump: true,
    Rating: 'JL_4',
  }

  csvMgt.writeToCsvChangeRecord(
    'purgatory', 
    path.dirname(songStoreData.filePathPurgatory), 
    csvDataObj, 
    'FilePathPurgatory',
    songStoreData.filePathPurgatory
  );

  processor.on("preprocess", function(mdb) {
    // Remove existing VORBIS_COMMENT block, if any.
    if (mdb.type === flac.Processor.MDB_TYPE_VORBIS_COMMENT) {
      mdb.remove();
    }
    // Inject new VORBIS_COMMENT block.
    if (mdb.removed || mdb.isLast) {
      var mdbVorbis = flac.data.MetaDataBlockVorbisComment.create(mdb.isLast, vendor, newMetadata);
      this.push(mdbVorbis.publish());
    }
  });

  reader.pipe(processor).pipe(writer);

  console.log('write completed')

}