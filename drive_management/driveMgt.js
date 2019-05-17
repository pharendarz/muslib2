const fs = require('fs-extra');
const path = require('path');
// app
const csvMgt = require('./csvMgt');

exports.createFolderMirrorFiles = async (dumpAlbumPath, purgatoryAlbumPath) => {
    try {
        // add new folder if none exist in purg
        if (!fs.existsSync(purgatoryAlbumPath)){
            fs.mkdirSync(purgatoryAlbumPath)
        }

        // collect files from parent folder

        const rawFolder = path.dirname(dumpAlbumPath);
        let files = fs.readdirSync(rawFolder);
        // prevent from deleting folders in folders - unwanted situation
        let directoriesInside = false;
        // wait for all files to be moved
        const mirrorAllFilesFromFolder = () => {
            return new Promise(async (resolve, reject) => {
    
                for(let i=0; i<files.length; i++){
                    if (files[i] !== undefined){
                        // create path for purgatory
                        let filename = path.join(rawFolder, files[i]);
        
                        if (!fs.lstatSync(filename).isDirectory()){
                            let destinationFile = path.join(purgatoryAlbumPath, files[i]);
                            await fs.copyFile(filename, destinationFile).then(async () =>{
                                // console.log(`${filename} moved!`)
                                let csvDataObj = {
                                    jabba_id: '654',
                                    file_path_dump: dumpAlbumPath,
                                    file_path_purgatory: destinationFile,
                                    file_cleared: false
                                }
                                await csvMgt.writeToCsv('purgatory', purgatoryAlbumPath, csvDataObj);
                            }).catch(err => {
                                console.log(`error while mirroring file   = ${err} 
                                FROM::: ${filename} TO::: ${destinationFile}`);
                            })
                        } else {
                            directoriesInside = true;
                        }
                    }
                }
                resolve();
            })
        }
        await mirrorAllFilesFromFolder();
        // csvMgt.writeToCsv('purgatory', purgatoryAlbumPath);
        console.log(`removing folder::: ${rawFolder} dirInside = ${directoriesInside}`);
    } catch (err){
        console.error(err);
    }
}
exports.createFolderMoveFiles = async (dumpAlbumPath, purgatoryAlbumPath) => {
    try {
        // add new folder if none exist in purg
        if (!fs.existsSync(purgatoryAlbumPath)){
            fs.mkdirSync(purgatoryAlbumPath)
        }

        // collect files from parent folder

        const rawFolder = path.dirname(dumpAlbumPath);
        let files = fs.readdirSync(rawFolder);
        // prevent from deleting folders in folders - unwanted situation
        let directoriesInside = false;
        // wait for all files to be moved
        const moveAllFilesFromFolder = () => {
            return new Promise(async (resolve, reject) => {
    
                for(let i=0; i<files.length; i++){
                    if (files[i] !== undefined){
                        // create path for purgatory
                        let filename = path.join(rawFolder, files[i]);
        
                        if (!fs.lstatSync(filename).isDirectory()){
                            let destinationFile = path.join(purgatoryAlbumPath, files[i]);
                            await fs.move(filename, destinationFile).then(()=>{
                                // console.log(`${filename} moved!`)
                            }).catch(err => {
                                console.log(`error while moving err  = ${err} 
                                FROM::: ${filename} TO::: ${destinationFile}`);
                            })
                        } else {
                            directoriesInside = true;
                        }
                    }
                }
                resolve();
            })
        }
        await moveAllFilesFromFolder();
        csvMgt.writeToCsv('purgatory', purgatoryAlbumPath);
        console.log(`removing folder::: ${rawFolder} dirInside = ${directoriesInside}`);
        if (!directoriesInside){
            fs.rmdirSync(rawFolder);
        }
        // delete folder after move 
    } catch (err){
        console.error(err);
    }
}