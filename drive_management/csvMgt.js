const path = require('path');
const csvparser = require('csv-parser');
const fs = require('fs');

const _createCsv = (csvCase, purgatoryAlbumPath, appendRow, localName) => {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    let csvWriter;
    switch(csvCase){
        case 'purgatory':{
            const filePath = path.join(purgatoryAlbumPath, `_${localName}.csv`)
            csvWriter = createCsvWriter({
                path: filePath,
                header: [
                    {id: 'JabbaID', title: 'JabbaID'},
                    {id: 'FilePathDump', title: 'FilePathDump'},
                    {id: 'FilePathPurgatory', title: 'FilePathPurgatory'},
                    {id: 'FileClearedDump', title: 'FileClearedDump'},
                    {id: 'AlbumName', title: 'AlbumName'},
                    {id: 'ArtistName', title: 'ArtistName'},
                    {id: 'Rating', title: 'Rating'},
                    {id: 'SongTitle', title: 'SongTitle'},
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

exports.writeToCsv = async (csvCase, folderPath, data) => {

    console.log('CSV:::::::::::');

    const fileLocalPath = path.join(folderPath, '_local.csv');
    // decide if you're creating file or appending rows to a file
    let appendRow = false;
    if (fs.existsSync(fileLocalPath)){
        appendRow = true;
    }
    // check if indexKey is not given - create new rows, if is given, search for rows and update them
    let csvWriter;
    csvWriter = _createCsv(csvCase, folderPath, appendRow, 'local');
    let arrayData = [...[], data];
    csvWriter.writeRecords(arrayData).then(()=> console.log('written csv succesfully'))
}
exports.writeToCsvChangeRecord =  (csvCase, purgatoryAlbumPath, data, indexKey, indexMatchValue) => {
    /*
        csvCase = purgatory / other in future
        folderPath = 
    */
    return new Promise(async (resolve, reject) => {

        const fileLocalPath = path.join(purgatoryAlbumPath, '_local.csv');
        // decide if you're creating file or appending rows to a file
        let appendRow = false;
        if (fs.existsSync(fileLocalPath)){
            appendRow = true;
        }    
    
        await _changeRecordInLocalAlbumCsv_byKey(csvCase, purgatoryAlbumPath, indexKey, indexMatchValue, data);
        resolve();
    })
}
const _changeRecordInLocalAlbumCsv_byKey =  (csvCase, purgatoryAlbumPath, indexKey, indexValue, objToChange) => {
    /*
        csvCase = purgatory / other in future
        indexKey = search row celsl by this key
        indexValue = value in key to match
    */
    return new Promise(async (resolve, reject) => {
        const localFile = path.join(purgatoryAlbumPath, '_local.csv');
        let csvData = [];
        // const pipeTest = fs.createReadStream(localFile).pipe(csvparser());
            fs.createReadStream(localFile)
                .pipe(csvparser())
                .on('data', (row) => {
                    csvData.push(row);
                })
                .on('end', () => {
                    // check all rows and cells
                    for(let i=0; i<csvData.length; i++){
                        Object.keys(csvData[i]).forEach(key => {
    
                            let cellValue = csvData[i][key];
                            if (key === indexKey && cellValue === indexValue){
                                // check if any differences between rows
                                let rowChanged = false;
                                let newObjToChange = {};
                                Object.keys(csvData[i]).forEach(key => {
                                    cellValue = csvData[i][key];
                                    let cellChangeValue = objToChange[key]; 
                                    // if undefined, make blank
                                    if (!cellChangeValue){
                                        cellChangeValue = '';
                                    } 
                                    // prevent from blank updates if something is filled in current file
                                    if (cellChangeValue === '')
                                        cellChangeValue = cellValue;
    
                                    // assign to new Object definition
                                    newObjToChange[key] = cellChangeValue;
                                    // if any differences appear request change to csv file
                                    if (cellChangeValue !== cellValue){
                                        rowChanged = true;
                                        console.log('\u001b[1;34m WE HAVE GOT DIFF ');
                                    }
                                    
                                })
                                
                                if(rowChanged){
                                    // delete row
                                    const filteredRows = csvData.filter(obj => obj !== csvData[i]);
                                    
                                    // create new rows array & add new row with updated data
                                    const newCsvRows = [...filteredRows, newObjToChange];
    
                                    // delete old file
                                    fs.unlinkSync(localFile);
        
                                    // create new _local.csv file
                                    let csvWriter = _createCsv(csvCase, purgatoryAlbumPath, false, 'local');
                                    csvWriter.writeRecords(newCsvRows).then(()=> console.log('\u001b[1;32m written csv CHANGED -  succesfully'))
                                    resolve(newCsvRows);
                                } else
                                    resolve();
                            }
                        })
                    }
                })
    })
}
exports.readFromLocalAlbumCsv_returnDumpPath = (purgatoryAlbumPath, purgatoryFilePath) => {
    return new Promise((resolve, reject) => {
        const localFile = path.join(purgatoryAlbumPath, '_local.csv');
        let csvData = [];
        fs.createReadStream(localFile)
            .pipe(csvparser())
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', () => {
                for(let i=0; i<csvData.length; i++){
                    // console.log(csvData[i].JabbaID, purgatoryFilePath);
                    if (csvData[i].FilePathPurgatory === purgatoryFilePath){
                        // console.log('FOUND::: ' + csvData[i].FilePathPurgatory)
                        resolve(csvData[i].FilePathDump);
                    }
                }
                resolve('no dump path in _local.csv');
            })
    })
}