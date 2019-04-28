import axios from 'axios';

export const getAppPaths = async () => {
    let paths = null;
    await axios.get('/getpaths').then(response => response.data).then(result => {
        if (result){
            paths = result.appPaths;
        }
    })
    return paths;
}