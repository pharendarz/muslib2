const fs = require('fs-extra');
const path = require('path');

exports.createFolderWithFiles = async (dumpAlbumPath, purgAlbumPath) => {
    try {
        // add new folder if none exist in purg
        if (!fs.existsSync(purgAlbumPath)){
            fs.mkdirSync(purgAlbumPath)
        }

        // collect files from parent folder

        const rawFolder = path.dirname(dumpAlbumPath);
        let files = fs.readdirSync(rawFolder);
        // prevent from deleting folders in folders - unwanted situation
        let directoriesInside = false;
        const moveAllFilesFromFolder = () => {

            return new Promise(async (resolve, reject) => {
    
                for(let i=0; i<files.length; i++){
                    if (files[i] !== undefined){
                        // create path for purgatory
                        let filename = path.join(rawFolder, files[i]);
        
                        if (!fs.lstatSync(filename).isDirectory()){
                            let destinationFile = path.join(purgAlbumPath, files[i]);
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
        console.log(`removing folder::: ${rawFolder} dirInside = ${directoriesInside}`);
        if (!directoriesInside){
            fs.rmdirSync(rawFolder);
        }
        // delete folder after move 
    } catch (err){
        console.error(err);
    }
}