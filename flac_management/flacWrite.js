var fs = require("fs");
var flac = require("flac-metadata");

const filename = "/home/ouce/Desktop/muslibJS/testflac/mind.FLAC";
const filenameTarget = "/home/ouce/Desktop/muslibJS/testflac/mind3.FLAC";
var reader = fs.createReadStream(filename);
var writer = fs.createWriteStream(filenameTarget);
var processor = new flac.Processor();

var vendor = "przemy";
var comments = [
  "ARTIST=Przemy",
  "TITLE=Przemix",
  "ALBUM=P is for Przemy",
  "TRACKNUMBER=A1",
  "DATE=1993",
  "DISCOGS=22379",
  "MUSLIB=11111"
];

processor.on("preprocess", function(mdb) {
  // Remove existing VORBIS_COMMENT block, if any.
  if (mdb.type === flac.Processor.MDB_TYPE_VORBIS_COMMENT) {
    mdb.remove();
  }
  // Inject new VORBIS_COMMENT block.
  if (mdb.removed || mdb.isLast) {
    var mdbVorbis = flac.data.MetaDataBlockVorbisComment.create(mdb.isLast, vendor, comments);
    this.push(mdbVorbis.publish());
  }
});

reader.pipe(processor).pipe(writer);
console.log('write completed')