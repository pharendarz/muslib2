import axios from 'axios';
//app functions
import {createAlbums} from '../commonFunctions/dev';

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
            const songObj = await readFlacFromServer(singlePath);
            dispatch(readSongFlacType(songObj, view));
            return;
        } else {
            album.forEach(async file => {
                const songObj = await readFlacFromServer(file.filePath);
                dispatch(readSongFlacType(songObj, view));
            })
        }
    })

}
const readFlacFromServer = (filePath) => {
    return new Promise((resolve, reject)=> {
        axios({
            method: 'post', 
            url: '/readflac', 
            timeout: 5000, 
            data: {filePath: filePath}})
        .then(response => response.data)
        .catch(err => {
            console.log('ERROR READ ALL SONGS FLAC', err.message);
        })            
        .then(result => {
            // console.log('FILE ACTION:::', file);
            // console.log('result', result);
            if(result){
                let songObj = {
                    filePath: filePath,
                };
                for (let i=0; i<result.metadata.length; i++){
                    const key = Object.keys(result.metadata[i])[0];
                    const value = result.metadata[i][key];
                    // console.log('KEY VALUE:::', key.toLowerCase(), value);
                    switch(key.toLowerCase()){
                        case 'rating': {
                            songObj.rating = value;
                            break;
                        }
                        case 'indexalbum': {
                            songObj.indexAlbum = value;
                            break;
                        }
                        case 'indextrack': {
                            songObj.indexTrack = value;
                            break;
                        }
                        case 'artist': {
                            songObj.artist = value;
                            break;
                        }
                        case 'title': {
                            songObj.title = value;
                            break;
                        }
                        case 'album': {
                            songObj.albumFolder = value;
                            break;
                        }
                        default:
                            break;
                    }
                }
                //call action creator
                resolve(songObj);
            }
        })
    })
}
export const readSongFlacType = (song, view) => (dispatch, getState) => {
    switch(view){
        case 'LIBRARY':
            dispatch({type: 'READ_FILE_FLAC_LIBRARY', payload: song})
            break;
        case 'PURGATORY':
            dispatch({type: 'READ_FILE_FLAC_PURGATORY', payload: song})
            break;
        case 'ALBUMS':
            dispatch({type: 'READ_FILE_FLAC_ALBUMS', payload: song})
            break;
        default:
            break;
    }
}