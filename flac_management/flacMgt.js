const fs = require('fs');
const path = require('path');

function flatten(lists) {
    // console.log('lists = ', i, lists)
    return lists.reduce((a, b) => a.concat(b), []);
}
//let i = 0;  
function getDirectories(srcpath) {
    const readdir = fs.readdirSync(srcpath);
    //console.log(readdir);
    const pathArray = readdir.map(file => path.join(srcpath, file));
    //console.log(pathArray);
    const filteredArray = pathArray.filter(path => fs.statSync(path).isDirectory());
    //console.log(filteredArray);
    return filteredArray;
    // return fs.readdirSync(srcpath)
    //     .map(file => {return path.join(srcpath, file)})
    //     .filter(path => fs.statSync(path).isDirectory());
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

exports.readDrive = () => {
    return new Promise((resolve, reject) => {

        // const srcpath = "/home/ouce/Desktop/muslibJS/testflac/";
        const srcpath = "/home/ouce/Desktop/music/";
        // const srcpath = "/media/ouce/BlueOne/20 randomowych playlist/";
        const allPaths = getDirectoriesRecursive(srcpath);
        //console.log('read drive mister', allPaths);
        let fileList = []
        allPaths.map(path => {
            //console.log(path.toString());
            if (path !== undefined){
                let filename = findSpecificFileFormat(path.toString(), '.flac');
                //console.log(filename);
                if(filename !== null) fileList.push(filename);
            }
        });
        fileList = fileList.reduce((a, b) => a.concat(b), []);
        resolve(fileList);
    })
    // console.log(fileList);
}

