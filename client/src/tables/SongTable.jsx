import React, {Component} from 'react';
import Aux from '../containers/Ax/Ax';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
import ReadFlacButton from '../buttons/ReadFlac';
import SongTableRow from './body/SongTableRow';

class SongTable extends Component {
    state = {
        readAllFlac: false,
    }
    handleReadAllFlacs = async () => {
        this.setState({readAllFlac: !this.state.readAllFlac}, ()=>{});
        // await axios.post('/readdrive', {readTags: true}).then(response => response.data).then(result => {
        //     console.log('RESULT', result);
        //     if(result){
        //         this.setState({
        //             readAllFlac: result.readAllFlac,
        //         })
        //     }
        // })
    }
    render() {
        console.log('rerender');
        let songs = 
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Song path</th>
                            <th>Album</th>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>rating</th>
                            <th>read flac</th>
                        </tr>
                    </thead>
                    {this.props.songs.map((songPath, index)=>{
                        return(
                            <SongTableRow key={songPath} index={index} song={songPath} readFlac={this.state.readAllFlac}/>
                        )
                    })}
                    
                </Table>
        
        return (
            <div>
                <Button style={{background: 'red', border: '1px solid #000'}} onClick={this.handleReadAllFlacs}>Read all FLAC's</Button>
                {songs}
            </div>
        )
    }
}

export default SongTable;