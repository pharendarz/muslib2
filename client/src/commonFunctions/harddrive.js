
    import axios from 'axios';
    
    export const readDriveHDD = async (startLocation) => {
        
        return new Promise( async (resolve, reject) => {

            const ReadDrive = await new Promise(async (resolve, reject) => {
    
                await axios.post('/readdrive', {startLocation: startLocation}).then(response => response.data).then(result => {
                    // console.log(result);
                    if(result){
                        resolve(result.readFiles);
                    }
                })
            });
    
            Promise.all(ReadDrive).then(() => {
                // console.log('HDD RESULT:::', ReadDrive)
                // console.log('ReadDrive=========', ReadDrive);
                resolve(ReadDrive);
            })
        })
    }