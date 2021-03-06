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
            // console.log('ACTION PURG SONG ::: ', song);

            // read from csv _local file in album purgatory data
            const localData = await _readFromPurgatoryCsvLocal_ForDumpPath(song.filePath);
            // add data to payload
            song.filePathDump = localData.dumpPath;

            // add read data to album _local.csv file
            await _changeRecordInCsvLocal(song);

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
const _changeRecordInCsvLocal = (song) => {
    console.log(song.filePath);
    return new Promise ((resolve, reject) => {
        // search csv by index key
        const indexKey = 'FilePathPurgatory';
        // update package
        let csvDataObj = {
            JabbaID: 'not_necessary',
            FilePathPurgatory: song.filePath,
            FileClearedDump: false,
            Rating: song.Rating,
            SongTitle: song.title,
            AlbumName: song.album
        }
        axios({
            method: 'post', 
            url: '/api/purgatory/write_album_csv_change', 
            timeout: 5000, 
            data: {
                csvDataObj: csvDataObj,           
                indexKey: indexKey
            }
        })
        .then(response => response.data)
        .catch(err => {
            console.log('ERROR write_album_csv_change:::', err.message);
        })            
        .then(result => {
            // console.log('write_album_csv_change', result);
            resolve(result)
        });
    })
}
const _readFromPurgatoryCsvLocal_ForDumpPath = (localFilePath) => {
    return new Promise ((resolve, reject) => {
        axios({
            method: 'post', 
            url: '/api/purgatory/read_album_csv_return_dump_path', 
            timeout: 5000, 
            data: {purgatoryPath: localFilePath}})
        .then(response => response.data)
        .catch(err => {
            console.log('ERROR read_album_csv_return_dump_path:::', err.message);
        })            
        .then(result => {
            resolve(result)
        })
    })
}