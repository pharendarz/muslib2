const fs = require('fs');
const path = require('path');
//app
const appPaths = require('../general_setup/appPaths');

function flatten(lists) {
    return lists.reduce((a, b) => a.concat(b), []);
}
function getDirectories(srcpath) {
    const readdir = fs.readdirSync(srcpath);
    //console.log(readdir);
    const pathArray = readdir.map(file => path.join(srcpath, file));
    //console.log(pathArray);
    const filteredArray = pathArray.filter(path => fs.statSync(path).isDirectory());
    //console.log(filteredArray);
    return filteredArray;
}
function findSpecificFileFormat(startPath, filter){
    if (!fs.existsSync(startPath)){
        console.log("no dir", startPath);
        return;
    }
    let pathsWithFilter = [];
    let files = fs.readdirSync(startPath);
    //console.log('start path file = ', startPath);
    //console.log('files = ', files);
    for(let i=0; i<files.length; i++){
        //console.log('files array = ', files[i]);
        if (files[i] !== undefined){
            let filename = path.join(startPath, files[i]);
            // console.log('filenamePath = ', filename);

            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                findSpecificFileFormat(filename, filter); //recurse
            }
            else if (filename.toLowerCase().indexOf(filter)>=0){
                //console.log('--found ', filename);
                pathsWithFilter.push(filename);
            }
        }
    }
    // console.log('pathsWithFilter', pathsWithFilter)
    if (pathsWithFilter.length === 0) 
        return null;
    else
        return pathsWithFilter;
}
function getDirectoriesRecursive(srcpath) {
    
    const dirs = getDirectories(srcpath);
    //console.log('iterate = ', i+=1, dirs);
    const recursive = dirs.map(path => {
        return getDirectoriesRecursive(path)
    });
    //console.log('recursive', recursive);
    return [srcpath, ...flatten(recursive)];
}

exports.readDrive = (startLocation) => {
    return new Promise((resolve, reject) => {
        
        let srcpath = '';
        if (startLocation)
            srcpath = startLocation;
        else
            srcpath = appPaths.appPaths.purgatoryPath;
        
        const allPaths = getDirectoriesRecursive(srcpath);
        let fileList = [];
        allPaths.map(filePath => {
            // console.log('PATH:', path);
            if (filePath !== undefined){
                let pathsArray = findSpecificFileFormat(filePath.toString(), '.flac');
                // console.log('PATHSARRAY::::', pathsArray);
                const parentDirName = path.dirname(pathsArray[0]).split(path.sep).pop();
                console.log(parentDirName);
                const obj = {
                    filePaths: pathsArray,
                    albumFolder: parentDirName,
                }
                // console.log('FILE MGT_readDrive newObject', obj);
                if(pathsArray !== null) fileList.push(obj);
            }
        });
        fileList = fileList.reduce((a, b) => a.concat(b), []);
        // console.log('FILELIST: ', fileList);
        resolve(fileList);
    }).catch(err => console.log(`READ_DRIVE_ERR`, err))
    // console.log(fileList);
}

