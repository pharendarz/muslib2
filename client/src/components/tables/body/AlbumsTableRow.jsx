import React from 'react';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType, readSongsWithFlacType} from '../../../actions';
import {testUndefined} from '../../../commonFunctions/helpers';

class SongTableBody extends React.Component {
    render(){
        let indexAlbum = null;
        let indexTrack = null;
        let artist = null;
        let title = null;
        let rating = null;
        let filepath = '';
        let albumFolder = '';

        const albumObject = this.props.album;
        if (testUndefined(albumObject)){
            
            indexAlbum = albumObject.indexAlbum;            
            indexTrack = albumObject.indexTrack;
            artist = albumObject.artist;
            rating = albumObject.rating;            
            albumFolder = albumObject.albumFolder;
        }

        return (
            <tbody>
            <tr>
            <td>{indexAlbum}</td>
            <td>{artist}</td>
            <td>{title}</td>
            <td>3/14</td>
            <td>15</td>
            <td>true/false</td>
            <td>Active 03.05.2019</td>
            <td>3.5/5 stars</td>
            </tr>
            </tbody>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {
        filePathsState: state.mongoAlbums,
    }; 
}

export default connect(
        mapStateToProps, 
        {readSongFlacType, readSongsWithFlacType} // << drugi argument zawiera ACTION CREATORY ES6 << {readSongFlacType: readSongFlacType} = {readSongFlacType}
    )(SongTableBody);
    
//>>