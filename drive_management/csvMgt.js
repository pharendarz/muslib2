const path = require('path');
const csvparser = require('csv-parser');
const fs = require('fs');

const _createCsv = (csvCase, purgatoryAlbumPath, appendRow) => {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    let csvWriter;
    switch(csvCase){
        case 'purgatory':{
            const filePath = path.join(purgatoryAlbumPath, '_local.csv')
            csvWriter = createCsvWriter({
                path: filePath,
                header: [
                    {id: 'jabba_id', title: 'JabbaID'},
                    {id: 'file_path_dump', title: 'FilePathDump'},
                    {id: 'file_path_purgatory', title: 'FilePathPurgatory'},
                    {id: 'file_cleared', title: 'FileCleared Dump'},
                    {id: 'album_name', title: 'AlbumName'},
                    {id: 'artist_name', title: 'ArtistName'},
                    {id: 'rating', title: 'Rating'},
                ],
                append: appendRow
            })

            
            break;
        }
        default:
            break;
    }
    return csvWriter;
}

exports.writeToCsv = (csvCase, folderPath, data) => {
    console.log('CSV:::::::::::');

    const fileLocalPath = path.join(folderPath, '_local.csv');
    let appendRow = false;

    if (fs.existsSync(fileLocalPath)){
        appendRow = true;
    }

    const csvWriter = _createCsv(csvCase, folderPath, appendRow);

    let arrayData = [...[], data];
    csvWriter.writeRecords(arrayData).then(()=> console.log('written csv succesfully'))

}

exports.readFromLocalAlbumCsv_returnDumpPath = (purgatoryAlbumPath, purgatoryPath) => {
    return new Promise((resolve, reject) => {
        const localFile = path.join(purgatoryAlbumPath, '_local.csv');
        let csvData = [];
        fs.createReadStream(localFile)
            .pipe(csvparser())
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', () => {
                console.log('csv processed', csvData);
                for(let i=0; i<csvData.length; i++){
                    console.log(csvData[i].JabbaID, purgatoryPath);
                    if (csvData[i].FilePathPurgatory === purgatoryPath){
                        console.log('FOUND::: ' + csvData[i].FilePathPurgatory)
                        resolve(csvData[i].FilePathDump);
                    }
                    // resolve();
                }
            })
    })
}