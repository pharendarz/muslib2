import React from 'react';
import ReadFlacButton from '../../buttons/ReadFlac';
import axios from 'axios';
import {Button,} from 'react-bootstrap';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType, readSongsWithFlacType} from '../../../actions';
//app functions
import {testUndefined} from '../../../commonFunctions/helpers';

class SongTableBody extends React.Component {
    constructor(props){
        super(props);

        this.handleReadFlac = this.handleReadFlac.bind(this);
        this.handleWriteFlac = this.handleWriteFlac.bind(this);
    }
    handleWriteFlac = (filePath) => {
        axios({method: 'post', url: '/writeflac', timeout: 5000, data: {filePath: filePath}});
    }
    handleReadFlac = async (filePath) => {
        this.props.readSongsWithFlacType('PURGATORY', filePath);
    }

    render(){
        let indexAlbum = null;
        let indexTrack = null;
        let artist = null;
        let title = null;
        let rating = null;
        let filepath = '';
        let albumFolder = '';
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
        }

        return (
            <tbody>
            <tr>
                <td>{this.props.indexAlbum}</td>
                <td>{filepath}</td>
                <td>{albumFolder}</td>
                <td>{indexAlbum}</td>
                <td>{indexTrack}</td>
                <td>{artist}</td>
                <td>{title}</td>
                <td>{rating}</td>
                <td>true/false</td>
                <td><Button onClick={() => this.handleReadFlac(this.props.song.filePath)}>Read Flac</Button></td>
                <td><Button onClick={() => this.handleWriteFlac(this.props.song.filePath)} style={{background: 'tomato', border: '1px solid #000'}}>Write Tags</Button></td>
            </tr>
            </tbody>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {
        filePathsState: state.filePathsPurgatory,
    }; // MUSI ZWRACAC OBIEKT
}

export default connect(mapStateToProps, 
    {readSongFlacType, readSongsWithFlacType} // << drugi argument zawiera ACTION CREATORY ES6 << {readSongFlacType: readSongFlacType} = {readSongFlacType}
)(SongTableBody);
//>>