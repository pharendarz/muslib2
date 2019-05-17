import React from 'react';
import axios from 'axios';
import {Button, InputGroup} from 'react-bootstrap';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType, readSongsWithFlacType} from '../../../actions';
//app functions
import {testUndefined} from '../../../commonFunctions/helpers';
// app setup
import {getAppPaths} from '../../../commonFunctions/application';

class SongTableBody extends React.Component {
    handleWriteFlac = (filePath) => {
        axios({method: 'post', url: '/writeflac', timeout: 5000, data: {filePath: filePath}});
    }
    handleReadFlac = async (filePath) => {
        this.props.readSongsWithFlacType('PURGATORY', filePath);
    }
    handleUpdateCSV = (purgatoryPath) => {
        let csvDataObj = {
            jabba_id: '555',
            file_path: purgatoryPath,
            file_cleared: false
        }
        axios({method: 'post', url: '/api/purgatory/write_album_csv', timeout: 5000, data: {
            csvDataObj: csvDataObj,            
        }});
    }
    handleReadCSV = (purgatoryPath) => {
        axios({method: 'post', url: '/api/purgatory/read_album_csv', timeout: 5000, data: {
            purgatoryPath: purgatoryPath,            
        }});
    }
    render(){
        let filepath = '';
        let dumpPath = '';
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
            if(testUndefined(fileObject.filePathDump, 'filePathDump'))
                dumpPath = fileObject.filePathDump;
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
                <td>{filepath.substring(0,35)}...</td>
                <td>{dumpPath.substring(0,35)}...</td>
                {/* <td>{filepath}</td>
                <td>{dumpPath}</td> */}
                <td><InputGroup.Checkbox /></td>
                <td>{albumFolder}</td>
                <td>{album}</td>
                <td>{indexAlbum}</td>
                <td>{indexTrack}</td>
                <td>{artist}</td>
                <td>{title}</td>
                <td>{rating}</td>
                <td><Button onClick={() => this.handleReadCSV(this.props.song.filePath)} style={{background: 'orange', border: '1px solid #000'}}>read csv</Button></td>
                <td><Button onClick={() => this.handleUpdateCSV(this.props.song.filePath)} style={{background: 'lightblue', border: '1px solid #000'}}>update csv</Button></td>
                <td><Button onClick={() => this.handleWriteFlac(this.props.song.filePath)} style={{background: 'tomato', border: '1px solid #000'}}>Write Tags</Button></td>
                <td>fileloc</td>
            </tr>
            </tbody>
        )
    }
}


const mapStateToProps = (state) => { 
    return {
        filePathsState: state.filePathsPurgatory,
    }; 
}

export default connect(mapStateToProps, 
    {readSongFlacType, readSongsWithFlacType}
)(SongTableBody);
