import React from 'react';
import {Button} from 'react-bootstrap';

import {readDriveHDD} from '../../commonFunctions/harddrive';
import {getAppPaths} from '../../commonFunctions/application';

const _handleReadDrive = async (props) => {
    const appPaths = await getAppPaths();
    const arrayOfPaths = await readDriveHDD(appPaths.musicLibraryPath);
    // console.log('ARRAY OF PATHS::::', arrayOfPaths);
    const modPaths = arrayOfPaths.map(path => {
        return (path.filePaths.map(fileObj => {
            
            return {
                filePath: fileObj,
                albumFolder: path.albumFolder
            }
        }))
    });
    console.log('MOD PATHS::::', modPaths);
    props.readDrivePurgatory(modPaths);
}


const LibraryButtons = (props) => {
    return (
        <div>
            <Button 
                key="libraryButton_1"
                style={{background: 'red', border: '1px solid #000'}} 
                onClick={()=>{props.readSongsWithFlacType('LIBRARY')}}
            >
                Read all FLAC's
            </Button>
            <Button 
                key="libraryButton_2"
                style={{background: 'green', border: '1px solid #000'}} 
                onClick={() => _handleReadDrive(props)}
            >
                Read drive
            </Button>

        </div>
    )
}

export default LibraryButtons;