import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { readDrive } from '../../actions';
//app
import Aux from '../containers/Ax/Ax';
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
    handleReadDrive = async (readTags) => {
        return new Promise( async (resolve, reject) => {

            const ReadDrive = await new Promise(async (resolve, reject) => {
    
                await axios.post('/readdrive', {readTags: readTags}).then(response => response.data).then(result => {
                    // console.log(result);
                    if(result){
                        // this.setState({
                        //     songs: result.songs,
                        // })
                        resolve(result.filePaths);
                    }
                })
            });
    
            Promise.all(ReadDrive).then(() => {
                // console.log('ReadDrive=========', ReadDrive);
                resolve(ReadDrive);
            })
        })
    }
    render() {
        // console.log('RERENDER ==== ', this.props.filePaths);
        let songsRedux = (
            <div>
                
            </div>
        )
        let songs = (
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
                    {/* {this.props.songs.map((songPath, index)=>{
                        return(
                            <SongTableRow key={songPath} index={index} song={songPath} readFlac={this.state.readAllFlac}/>
                        )
                    })} */}
                    {this.props.filePaths.length !== 0 ? 
                    this.props.filePaths.map((item, index) => {
                    // console.log(item);
                    return (
                        <SongTableRow key={item} index={index} songPath={item} readFlac={false}/>
                    )}) :
                        <SongTableRow key={'nosongkey-1'} index={0} songPath={'No songs'} readFlac={false}/>}
                </Table>
                )
        
        return (
            <div>
                <Button style={{background: 'red', border: '1px solid #000'}} onClick={this.handleReadAllFlacs}>Read all FLAC's</Button>
                <Button style={{background: 'green', border: '1px solid #000'}} 
                    onClick={async () =>  {
                        const arrayOfPaths = await this.handleReadDrive(false);
                        this.props.readDrive(arrayOfPaths);
                        // console.log('arrayOfPaths', arrayOfPaths);
                        // console.log('PROPS', this.props)
                    }}
                >
                    Read drive
                </Button>
                {songs}
                {/* {songsRedux} */}
                
            </div>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    // console.log('STATE:' , state);
    return {filePaths: state.filePaths}; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readDrive: readDrive,} // << drugi argument zawiera ACTION CREATORY
)(SongTable);
// export default SongTable;

//>>