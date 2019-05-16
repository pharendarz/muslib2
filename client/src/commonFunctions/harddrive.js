import axios from 'axios';

export const readDriveHDD = async (startLocation) => {
    
    return new Promise( async (resolve, reject) => {

        // const ReadDrive = await new Promise(async (resolve, reject) => {

            await axios.post('/readdrive', {startLocation: startLocation}).then(response => response.data).then(result => {
                // console.log(result);
                if(result){
                    resolve(result.readFiles);
                }
            })
        // });

        // Promise.all(ReadDrive).then(() => {
        //     // console.log('HDD RESULT:::', ReadDrive)
        //     // console.log('ReadDrive=========', ReadDrive);
        //     resolve(ReadDrive);
        // })
        // .catch(()=>{
        //     resolve([]);
        // })
    })
}

export const readFlacFromHDD = (filePath) => {
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
                            songObj.album = value;
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