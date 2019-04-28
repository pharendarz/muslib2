const path = require('path');

var fs = require("fs");
var flac = require("flac-metadata");

const appPaths = require('../general_setup/appPaths');

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


createArrayOfTags = (metadata ) => {
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
changeValueInKey = (oldMetadata, keyName, changeValue) => {

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

exports.flacWrite = (filePath, oldMetadata, newComments) => {
  const musicLibraryPath = appPaths.appPaths.musicLibraryPath;
  const purgatoryPath = appPaths.appPaths.purgatoryPath;

  const filename = path.basename(filePath);
  const extension = path.extname(filePath);
  const file = path.basename(filename, extension);
  console.log('FILE:', '//', filename, '//', extension, '//', file);

  const filenameTarget = `${musicLibraryPath}${filename}`;

  var reader = fs.createReadStream(filePath);
  var writer = fs.createWriteStream(filenameTarget);
  var processor = new flac.Processor();

  var vendor = "JabbaLibrary 1.0";

  // var comments = [
  //   "ARTIST=Przemy",
  //   "TITLE=Przemix",
  //   "ALBUM=P is for Przemy",
  //   "TRACKNUMBER=A1",
  //   "DATE=1993",
  //   "DISCOGS=22379",
  //   "MUSLIB=11111",
  //   "RATING=PRZEMY_3"
  // ];
  console.log(`BEFORE`);
  console.log(oldMetadata);
  let newMetadata = changeValueInKey(oldMetadata, 'Rating', 'JL_' + 3);
  newMetadata = (createArrayOfTags(oldMetadata));
  console.log(`AFTER`);
  console.log(newMetadata);

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