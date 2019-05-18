import React from 'react';
import {Button} from 'react-bootstrap';

import {readDriveHDD} from '../../commonFunctions/harddrive';
import {getAppPaths} from '../../commonFunctions/application';
import {removeDuplicatesByProperty} from '../../commonFunctions/helpers';

const _handleReadDrive = async (props) => {
    const appPaths = await getAppPaths();
    const arrayOfPaths = await readDriveHDD(appPaths.dumpPath);
    // console.log('ARRAY OF PATHS::::', arrayOfPaths);
    if (arrayOfPaths) {

        const modPaths = arrayOfPaths.map(path => {
            return (path.filePaths.map(fileObj => {
                
                return {
                    filePath: fileObj,
                    albumFolder: path.albumFolder
                }
            }))
        });
        console.log('MOD PATHS::::', modPaths);
        props.readDriveDump(modPaths);
    }
}

const _handleCreateMongoByAlbum = async (props, property) => {
    //[TODO] check if everything is processed - tags, all files are rated in album, 
    //get info from store about files
    // console.log(this.props);
    let newArray = [];
    props.readAlbums.forEach(album => {
        album.forEach(object => {
            console.log(object[property]);
            if (object[property] !== '')
                newArray.push(object);
        })
    })
    console.log('newArray', newArray)
    const uniqueAlbums = removeDuplicatesByProperty(newArray, 'albumFolder');
    

    console.log(`uniqueAlbums:`, uniqueAlbums);
    props.createMongoAlbumsFromPurgatory(uniqueAlbums);
}

const DumpButtons = (props) => {
    return (
        <div>
            {/* <Button 
                key="dumpButton_1"
                style={{background: 'red', border: '1px solid #000'}} 
                onClick={()=>{props.readSongsWithFlacType('DUMP')}}
            >
                Read all FLAC's
            </Button> */}
            {/* <Button 
                key="dumpButton_2"
                variant="dark" 
                onClick={() => {}}
            >
                Add AlbumId
            </Button> */}
            <Button 
                key="dumpButton_3"
                style={{background: 'green', border: '1px solid #000'}} 
                onClick={() => _handleReadDrive(props)}
            >
                Read drive
            </Button>
            {/* <Button 
                key="dumpButton_4"
                variant="dark" 
                onClick={() => _handleCreateMongoByAlbum(props, 'albumFolder')}
            >
                Update Mongo
            </Button> */}

        </div>
    )
}

export default DumpButtons;