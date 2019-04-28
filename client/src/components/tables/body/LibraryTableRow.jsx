import React from 'react';
import ReadFlacButton from '../../buttons/ReadFlac';
import axios from 'axios';
import {Button,} from 'react-bootstrap';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType} from '../../../actions';

function test(t) {      //defining a function
    if (t === undefined) {       //if t=undefined, call tt
          console.log(t)      //call t
    }
    return t;    
}

class SongTableBody extends React.Component {
    constructor(props){
        super(props);

        this.handleReadFlac = this.handleReadFlac.bind(this);
        this.handleWriteFlac = this.handleWriteFlac.bind(this);
    }
    handleWriteFlac = (filePath) => {
        const response = axios({method: 'post', url: '/writeflac', timeout: 5000, data: {filePath: filePath}});

    }
    handleReadFlac = async (filePath) => {
        const response = axios({method: 'post', url: '/readflac', timeout: 5000, data: {filePath: filePath}})
        .then(response => response.data)
        .catch(err => {
            console.log('ERRRRRRRRRORRRRRR', err.message);
            // throw new Error('oh no!');
            // this.setState({
            //     rating: 'error',
            //     album: 'error',
            //     artist: 'error',
            //     title: 'error',
            // });
        })            
        .then(result => {
            console.log('result', result);
            if(result){
                let songObj = {
                    filePath: filePath,
                    rating: null,
                    album: null,
                    artist: null,
                    title: null,
                };
                for (let i=0; i<result.metadata.length; i++){

                    const key = Object.keys(result.metadata[i])[0];
                    const value = result.metadata[i][key];

                    switch(key.toLowerCase()){
                        case 'rating': {
                            songObj.rating = value;
                            break;
                        }
                        case 'album': {
                            songObj.album = value;
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
                        default:
                            break;
                    }
                }
                //call action creator
                this.props.readSongFlacType(songObj, 'LIBRARY');
            }
        });
        
    }
    componentDidUpdate(prevProps){
        // console.log('redbutton', prevProps.readFlac, prevProps.song);
        // if (prevProps.readFlac !== this.props.readFlac){
        //     //if (prevProps.readFlac){
        //         console.log('red button', prevProps.song);
        //         this.handleReadFlac(prevProps.song);
        //     //}
        // }
    }

    render(){
        let album = null;
        let artist = null;
        let title = null;
        let rating = null;
        if (test(this.props.filePathsState[this.props.index])){
            album = this.props.filePathsState[this.props.index].album;
            artist =  this.props.filePathsState[this.props.index].artist;
            title =  this.props.filePathsState[this.props.index].title;
            rating =  this.props.filePathsState[this.props.index].rating;
        }

        return (
            <tbody>
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.song.filePath}</td>
                <td>{album}</td>
                <td>{artist}</td>
                <td>{title}</td>
                <td>{rating}</td>
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
        filePathsState: state.filePathsLibrary,
    }; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readSongFlacType} // << drugi argument zawiera ACTION CREATORY ES6 << {readSongFlacType: readSongFlacType} = {readSongFlacType}
    )(SongTableBody);
    // export default SongTable;
    
    //>>
// export default SongTableBody;