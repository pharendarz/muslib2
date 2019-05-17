import axios from 'axios';
//app functions
import {createAlbums} from '../commonFunctions/dev';
import {readFlacFromHDD} from '../commonFunctions/harddrive';
export const readDriveDump = (filePaths) => {
    // console.log('ACTION READ DRIVE PURG', filePaths);
    return {
        type: 'READ_DRIVE_DUMP',
        payload: filePaths
    }
}
export const readDrivePurgatory = (filePaths) => {
    // console.log('ACTION READ DRIVE PURG', filePaths);
    return {
        type: 'READ_DRIVE_PURGATORY',
        payload: filePaths
    }
}
export const readDriveLibrary = (filePaths) => {
    return {
        type: 'READ_DRIVE_LIBRARY',
        payload: filePaths
    }
}
export const readMongoAlbums = (albums) => {
    console.log(`ALBUMS ACTION`, albums);
    return {
        type: 'READ_MONGO_ALBUMS',
        payload: albums
    }
}
export const createMongoAlbumsFromPurgatory = (albums) => async (dispatch, getState) => {
    console.log(`createMongoAlbumsFromPurgatory ACTION`, albums);
    await createAlbums(albums);
    
    dispatch({
        type: 'CREATE_MONGO_ALBUMS',
        payload: albums
    })
}
export const readSongsWithFlacType = (view, singlePath) => (dispatch, getState) => {
    if (!view) 
        return;
    let filePaths = [];
    switch(view){
        case 'DUMP':
            filePaths = getState().filePathsDump;
            break;
        case 'PURGATORY':
            filePaths = getState().filePathsPurgatory;
            break;
        case 'LIBRARY':
            filePaths = getState().filePathsLibrary;
            break;
        case 'ALBUMS':
            filePaths = getState().filePathsAlbums;
            break;
        default:
            break;
    }
    
    console.log('FILEPATHS:', filePaths);
    filePaths.forEach(async album => {
        // console.log('ALBUM ACTION:::', album);
        if(singlePath){
            console.log('return from single path', singlePath);
            const songObj = await readFlacFromHDD(singlePath);
            dispatch(readSongFlacType(songObj, view));
            return;
        } else {
            album.forEach(async file => {
                const songObj = await readFlacFromHDD(file.filePath);
                dispatch(readSongFlacType(songObj, view));
            })
        }
    })

}

export const readSongFlacType = (song, view) => async (dispatch, getState) => {
    switch(view){
        case 'DUMP':
            dispatch({type: 'READ_FILE_FLAC_DUMP', payload: song})
            break;
        case 'PURGATORY':
            console.log('ACTION PURG', song);
            // read from csv _local file in album purgatory data
            const localData = await _readFromPurgatoryCsvLocal(song.filePath);
            // add data to payload
            song.filePathDump = localData.dumpPath;
            // console.log(localData);
            // dispatch
            dispatch({type: 'READ_FILE_FLAC_PURGATORY', payload: song})
            break;
        case 'LIBRARY':
            dispatch({type: 'READ_FILE_FLAC_LIBRARY', payload: song})
            break;
        case 'ALBUMS':
            dispatch({type: 'READ_FILE_FLAC_ALBUMS', payload: song})
            break;
        default:
            break;
    }
}

const _readFromPurgatoryCsvLocal = (localFilePath) => {
    return new Promise ((resolve, reject) => {
        axios({
            method: 'post', 
            url: '/api/purgatory/read_album_csv_return_dump_path', 
            timeout: 5000, 
            data: {purgatoryPath: localFilePath}})
        .then(response => response.data)
        .catch(err => {
            console.log('ERROR READ ALL SONGS FLAC', err.message);
        })            
        .then(result => {
            // console.log(result);
            resolve(result)
        })
    })
}