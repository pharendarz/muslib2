import React from 'react';
import ReadFlacButton from '../../buttons/ReadFlac';
import axios from 'axios';
import {Button,} from 'react-bootstrap';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType, readSongsWithFlacType} from '../../../actions';
//app functions
import {testUndefined} from '../../../commonFunctions/helpers';
// app setup
import {getAppPaths} from '../../../commonFunctions/application';
class SongTableBody extends React.Component {
    constructor(props){
        super(props);

        this.handleReadFlac = this.handleReadFlac.bind(this);
        // this.handleWriteFlac = this.handleWriteFlac.bind(this);
    }
    // handleWriteFlac = (filePath) => {
    //     axios({method: 'post', url: '/writeflac', timeout: 5000, data: {filePath: filePath}});
    // }
    handleReadFlac = async (filePath) => {
        this.props.readSongsWithFlacType('DUMP', filePath);
    }
    handleProceedAlbum = async (dumpAlbumPath, folderName) => {
        const appPaths = await getAppPaths();
        console.log('FOLDER NAME:::', folderName);
        const purgAlbumPath = appPaths.purgatoryPath + folderName;
        //determine name of album folder
        //by default Band + "_" + AlbumName without special signs
        
        //move all files with defined circumstances to purgatory folder
        // console.log('dumpAlbumPath', dumpAlbumPath);
        // console.log('purgAlbumPath', purgAlbumPath);
        axios({method: 'post', url: '/api/purgatory/create_mirror', timeout: 5000, data: {
            dumpAlbumPath: dumpAlbumPath,
            purgAlbumPath: purgAlbumPath
        }});
    }
    render(){
        let filepath = '';
        let purgatoryPath = '';
        let albumFolder = '';

        let indexAlbum = null;
        let indexTrack = null;

        let artist = null;
        let title = null;
        let rating = null;
        let album = '';

        const albumObject = this.props.filePathsState[this.props.indexAlbum];

        if (testUndefined(albumObject)){
            
            const fileObject = this.props.filePathsState[this.props.indexAlbum][this.props.indexFile];
            // console.log('RENDER OBJECT:::' ,fileObject);
            filepath = fileObject.filePath;
            if(testUndefined(fileObject.indexAlbum, 'indexAlbum'))
                indexAlbum = fileObject.indexAlbum;
                
            if(testUndefined(fileObject.indexTrack , 'indexTrack'))
                indexTrack = fileObject.indexTrack;

            if(testUndefined(fileObject.artist, 'artist'))
                artist = fileObject.artist;

            if(testUndefined(fileObject.rating, 'rating'))
                rating = fileObject.rating;
            if(testUndefined(fileObject.albumFolder, 'albumFolder'))
                albumFolder = fileObject.albumFolder;
            if(testUndefined(fileObject.album, 'album'))
                album = fileObject.album;
        }

        return (
            <tbody>
            <tr>
                <td>{this.props.indexAlbum}</td>
                {/* <td>{filepath.substring(0,10)}...</td>
                <td>{purgatoryPath.substring(0,10)}...</td> */}
                <td>{filepath}</td>
                <td>{purgatoryPath}</td>
                <td>{albumFolder}</td>
                <td>{album}</td>
                <td>{indexAlbum}</td>
                <td>{indexTrack}</td>
                <td>{artist}</td>
                <td>{title}</td>
                <td>{rating}</td>
                <td><Button onClick={() => this.handleProceedAlbum(this.props.song.filePath, albumFolder)} style={{background: 'lightgreen', border: '1px solid #000'}}>Purgatory</Button></td>
                <td><Button onClick={() => this.handleReadFlac(this.props.song.filePath)}>Read Flac</Button></td>
                {/* <td><Button onClick={() => this.handleWriteFlac(this.props.song.filePath)} style={{background: 'tomato', border: '1px solid #000'}}>Write Tags</Button></td> */}
                <td>fileloc</td>
            </tr>
            </tbody>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {
        filePathsState: state.filePathsDump,
    }; // MUSI ZWRACAC OBIEKT
}

export default connect(mapStateToProps, 
    {readSongFlacType, readSongsWithFlacType} // << drugi argument zawiera ACTION CREATORY ES6 << {readSongFlacType: readSongFlacType} = {readSongFlacType}
)(SongTableBody);
//>>