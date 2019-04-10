import React, {Component} from 'react';
import Aux from '../containers/Ax/Ax';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
import ReadFlacButton from '../buttons/ReadFlac';
class SongTable extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {

    //     }
    // }

    render() {
        let songs = 
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Song path</th>
                            <th>rating</th>
                            <th>read flac</th>
                        </tr>
                    </thead>
                    {this.props.songs.map((song, index)=>{
                        return(
                            <tbody>
                            <tr>
                                <td>{index}</td>
                                <td>{song}</td>
                                <td>*****</td>
                                <td><ReadFlacButton songPath={song}/></td>
                            </tr>
                            </tbody>
                        )
                    })}
                    
                </Table>
        
        return (
            <div>
                {songs}
                <Button>Elo</Button>
            </div>
        )
    }
}

export default SongTable;