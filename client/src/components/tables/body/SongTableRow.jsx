import React from 'react';
import ReadFlacButton from '../../buttons/ReadFlac';
import axios from 'axios';
import {Button,} from 'react-bootstrap';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType} from '../../../actions';

class SongTableBody extends React.Component {
    constructor(props){
        super(props);

        // this.state = {
        //     rating: null,
        //     album: null,
        //     artist: null,
        //     title: null,
        // }

        

        this.handleReadFlac = this.handleReadFlac.bind(this);
    }

    handleReadFlac = async (songPath) => {
        const response = axios({method: 'post', url: '/readflac', timeout: 5000, data: {songPath: songPath}})
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
            // console.log(result, songPath);
            console.log('result', result);
            if(result){
                let songObj = {
                    rating: null,
                    album: null,
                    artist: null,
                    title: null,
                };
                for (let i=0; i<result.metadata.length; i++){
                    //console.log('element', result.metadata[i]);
                    const key = Object.keys(result.metadata[i])[0];
                    const value = result.metadata[i][key];
                    // console.log(key, value);
                    switch(key.toLowerCase()){
                        case 'rating': {
                            // this.setState({rating: value}, ()=> {});
                            songObj.rating = value;
                            break;
                        }
                        case 'album': {
                            // this.setState({album: value}, ()=> {});
                            songObj.album = value;
                            break;
                        }
                        case 'artist': {
                            // this.setState({artist: value}, ()=> {});
                            songObj.artist = value;
                            break;
                        }
                        case 'title': {
                            // this.setState({title: value}, ()=> {});
                            songObj.title = value;
                            break;
                        }
                        default:
                            break;
                    }
                }
                //call action creator
                this.props.readSongFlacType(songObj);
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
        //console.log(this.props.song);
        console.log('PROPS', this.props)
        // const album = this.props.selectedSong ;
        // console.log('ALBUM: ', album);
        let album = null;
        let artist = null;
        let title = null;
        let rating = null;

        if (this.props.selectedSong !== null){
            album =  this.props.selectedSong.album;
            artist =  this.props.selectedSong.artist;
            title =  this.props.selectedSong.title;
            rating =  this.props.selectedSong.rating;

        }
        return (
            <tbody>
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.songPath}</td>
                <td>{album}</td>
                <td>{artist}</td>
                <td>{title}</td>
                <td>{rating}</td>
                {/* <td><ReadFlacButton songPath={this.props.song}/></td> */}
                <td><Button onClick={() => this.handleReadFlac(this.props.songPath)}>Read Flac</Button></td>
            </tr>
            </tbody>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    console.log('STATE ROW:' , state);
    
    return {
        selectedSong: state.selectedSong,
        // filePaths: state.filePaths,
    }; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readSongFlacType} // << drugi argument zawiera ACTION CREATORY ES6 << {readSongFlacType: readSongFlacType} = {readSongFlacType}
    )(SongTableBody);
    // export default SongTable;
    
    //>>
// export default SongTableBody;