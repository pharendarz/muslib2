import React from 'react';
import ReadFlacButton from '../../buttons/ReadFlac';
import axios from 'axios';



class SongTableBody extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rating: null,
            album: null,
            artist: null,
            title: null,
        }

        

        this.handleReadFlac = this.handleReadFlac.bind(this);
    }

    handleReadFlac = async (songPath) => {
        const response = axios({method: 'post', url: '/readflac', timeout: 5000, data: {songPath: songPath}})
        .then(response => response.data)
        .catch(err => {
            console.log('ERRRRRRRRRORRRRRR', err.message);
            // throw new Error('oh no!');
            this.setState({
                rating: 'error',
                album: 'error',
                artist: 'error',
                title: 'error',
            });
        })            
        .then(result => {
            // console.log(result, songPath);
            console.log('result', result);
            if(result){
                for (let i=0; i<result.metadata.length; i++){
                    //console.log('element', result.metadata[i]);
                    const key = Object.keys(result.metadata[i])[0].toLowerCase();
                    const value = result.metadata[i][Object.keys(result.metadata[i])[0]];
                    // console.log(key, value);
                    switch(key){
                        case 'rating': {
                            this.setState({rating: value}, ()=> {});
                            break;
                        }
                        case 'album': {
                            this.setState({album: value}, ()=> {});
                            break;
                        }
                        case 'artist': {
                            this.setState({artist: value}, ()=> {});
                            break;
                        }
                        case 'title': {
                            this.setState({title: value}, ()=> {});
                            break;
                        }
                        default:
                            break;
                    }
                }
            }
        });
        
    }
    componentDidUpdate(prevProps){
        console.log('redbutton', prevProps.readFlac, prevProps.song);
        if (prevProps.readFlac !== this.props.readFlac){
            //if (prevProps.readFlac){
                console.log('red button', prevProps.song);
                this.handleReadFlac(prevProps.song);
            //}
        }
    }
    render(){
        //console.log(this.props.song);
        return (
            <tbody>
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.song}</td>
                <td>{this.state.album}</td>
                <td>{this.state.artist}</td>
                <td>{this.state.title}</td>
                <td>{this.state.rating}</td>
                <td><ReadFlacButton songPath={this.props.song} handleReadFlac={this.handleReadFlac}/></td>
            </tr>
            </tbody>
        )
    }
}

export default SongTableBody;